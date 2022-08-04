interface Keys {
  key: String;
  name: String;
}

export interface Profile {
  data: {
    birthday: String;
    body_type: String;
    company: String;
    education: String | null;
    gender: String;
    height: Number;
    id: Number;
    introduction: String | null;
    job: String | null;
    location: String;
    name: String;
    pictures: String[];
    school: String | null;
  };
  meta: {
    body_type: Keys[];
    education: Keys[];
    genders: Keys[];
    height_range: {
      max: Number;
      min: Number;
    };
  };
}
