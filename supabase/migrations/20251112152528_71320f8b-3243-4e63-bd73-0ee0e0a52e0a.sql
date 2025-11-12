-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  institution_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create timetable configurations table
CREATE TABLE public.timetable_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  institution_name TEXT NOT NULL,
  num_classrooms INTEGER NOT NULL,
  num_batches INTEGER NOT NULL,
  subjects JSONB NOT NULL,
  max_classes_per_day INTEGER NOT NULL,
  classes_per_week JSONB NOT NULL,
  faculty_data JSONB NOT NULL,
  avg_leaves_per_month INTEGER DEFAULT 2,
  fixed_slots JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on timetable_configs
ALTER TABLE public.timetable_configs ENABLE ROW LEVEL SECURITY;

-- Timetable configs policies
CREATE POLICY "Users can view their own configs"
  ON public.timetable_configs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own configs"
  ON public.timetable_configs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own configs"
  ON public.timetable_configs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own configs"
  ON public.timetable_configs FOR DELETE
  USING (auth.uid() = user_id);

-- Create generated timetables table
CREATE TABLE public.generated_timetables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_id UUID NOT NULL REFERENCES public.timetable_configs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  timetable_data JSONB NOT NULL,
  optimization_score DECIMAL(5,2),
  status TEXT DEFAULT 'pending',
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on generated_timetables
ALTER TABLE public.generated_timetables ENABLE ROW LEVEL SECURITY;

-- Generated timetables policies
CREATE POLICY "Users can view their own timetables"
  ON public.generated_timetables FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create timetables"
  ON public.generated_timetables FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own timetables"
  ON public.generated_timetables FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_timetable_configs_updated_at
  BEFORE UPDATE ON public.timetable_configs
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();