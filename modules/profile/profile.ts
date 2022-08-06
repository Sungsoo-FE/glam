export interface Keys {
  key: string;
  name: string;
}

export interface Profile {
  data: Data;
  meta: Meta;
}

export interface Meta {
  body_types: Keys[];
  educations: Keys[];
  genders: Keys[];
  height_range: {
    max: number;
    min: number;
  };
}

export interface Data {
  birthday: string;
  body_type: string | null;
  company: string | null;
  education: string | null;
  gender: string;
  height: number | null;
  id: number;
  introduction: any;
  job: string | null;
  location: string;
  name: string;
  pictures: string[];
  school: string | null;
}
