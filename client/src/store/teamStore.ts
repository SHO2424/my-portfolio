// src/store/teamStore.ts
import { create } from 'zustand';

type Team = {
  id: number;
  name: string;
  logo: string;
  country: string;
  league: string;
};

type TeamStore = {
  selectedTeam: Team | null;
  setSelectedTeam: (team: Team) => void;
};

export const useTeamStore = create<TeamStore>((set) => ({
  selectedTeam: null,
  setSelectedTeam: (team) => set({ selectedTeam: team }),
}));
