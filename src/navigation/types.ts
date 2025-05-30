//src/navigation/types.ts
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  EditProfile: undefined;
  EditHabit: {habitId: string};
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Add: undefined;
  Stats: undefined;
  Profile: undefined;
};
