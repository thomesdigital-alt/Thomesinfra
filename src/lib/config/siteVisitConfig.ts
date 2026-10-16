export type TeamConfig = {
  teamName: string;
  leaderName: string;
  promisedVisits: number;
  completedVisits: number;
};

export const TEAMS: TeamConfig[] = [
  
  {
    teamName: "Race Gurram",
    leaderName: "Ravinder.K",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Crown Royal",
    leaderName: "Anjaneyulu.M",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "King Makers",
    leaderName: "K.Shankar rao",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Jai Bhavani",
    leaderName: "P.satyanarayana",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Future Reality",
    leaderName: "V.Venkata ramana",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "SSD Team",
    leaderName: "Y.Sudhakar",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Team Star",
    leaderName: "Renuka Das",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Varahi Reality",
    leaderName: "M.Prasad",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "SPR Reality",
    leaderName: "Satish Rathod",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "JMJ Team",
    leaderName: "Jacob",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Eagle's Team",
    leaderName: "N.Ravi Kumar",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Bhagath Singh",
    leaderName: "V.Nagaraju",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Daring Lion's",
    leaderName: "K.Venkatesh",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Alluri Sitarama Raju",
    leaderName: "B.Janardhan",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Vision Team",
    leaderName: "B.Rajasekhar",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Veeru The Warrior's",
    leaderName: "N.Veerandhara",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Swami Vivekananda",
    leaderName: "Arul Das",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Vin Vin Raisers",
    leaderName: "V.V.RamaRao",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Real Guru",
    leaderName: "NVR",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "Sardar Vallabhai patel",
    leaderName: "B.Hari Gopal",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "SVR Team",
    leaderName: "Kasim",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "7 Horses Team",
    leaderName: "N.Satish",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "CMW Team",
    leaderName: "Gangaram",
    promisedVisits: 0,
    completedVisits: 0,
  },
  {
    teamName: "HSR",
    leaderName: "Manish",
    promisedVisits: 0,
    completedVisits: 0,
  },

];
import rawProjectsData from "@/data/projects.json";

type Project = {
  name: string;
  // other project properties
};

type ProjectsData = {
  [country: string]: {
    [state: string]: Project[];
  };
};

const projectsData = rawProjectsData as ProjectsData;

export const SITE_NAMES = [
  ...new Set(
    Object.values(projectsData).flatMap((states) =>
      Object.values(states).flatMap((projects) =>
        projects.map((project) => project.name)
      )
    )
  ),
];
export const CAB_TYPES = ["5-Seater", "7-Seater"] as const;

export const getTeamByName = (teamName: string) =>
  TEAMS.find((team) => team.teamName === teamName);

export const getAllLeaders = () =>
  [...new Set(TEAMS.map((team) => team.leaderName))];