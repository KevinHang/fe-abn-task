export type Show = {
    id: number;
    name: string;
    rating: {
      average: number;
    };
    genres: string[];
    status: string;
    premiered: string;
    image: {
      medium: string;
      original: string;
    } | null; // Image property is optional and can be null if no image is available
};

interface Season {
    id: number;
    number: number;
    episodeOrder: number;
    premiereDate: string;
    endDate: string;
    image: { medium: string; original: string };
}
  
interface CastMember {
    person: {
        id: number;
        name: string;
        image: { medium: string; original: string };
    };
    character: {
        name: string;
    };
}
  
interface CrewMember {
    type: string;
    person: {
        id: number;
        name: string;
        image: { medium: string; original: string };
    };
}

const BASE_URL = "https://api.tvmaze.com";


// services/tvMazeApi.js or .ts
export const fetchShows = async (): Promise<Show[]> => {
    try {
      const pages = [0, 1, 2, 3, 4, 5];
      const fetchPromises = pages.map(page => 
        fetch(`${BASE_URL}/shows?page=${page}`).then(response => response.json())
      );
  
      const results = await Promise.all(fetchPromises);
      // Flatten the array of arrays to a single array of shows
      return results.flat();
    } catch (error) {
      console.error('Error fetching shows:', error);
      return [];
    }
  };

// Fetch Seasons
export const fetchSeasons = async (showId: number): Promise<Season[]> => {
  try {
    const response = await fetch(`${BASE_URL}/shows/${showId}/seasons`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const seasons: Season[] = await response.json();
    return seasons;
  } catch (error) {
    console.error("Failed to fetch seasons:", error);
    return [];
  }
};

// Fetch Cast
export const fetchCast = async (showId: number): Promise<CastMember[]> => {
  try {
    const response = await fetch(`${BASE_URL}/shows/${showId}/cast`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const castData = await response.json();
    const cast: CastMember[] = castData.map((item: any) => ({
      person: {
        id: item.person.id,
        name: item.person.name,
        image: item.person.image,
      },
      character: {
        name: item.character.name,
      },
    }));
    return cast;
  } catch (error) {
    console.error("Failed to fetch cast:", error);
    return [];
  }
};

// Fetch Crew
export const fetchCrew = async (showId: number): Promise<CrewMember[]> => {
  try {
    const response = await fetch(`${BASE_URL}/shows/${showId}/crew`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const crewData = await response.json();
    const crew: CrewMember[] = crewData.map((item: any) => ({
      type: item.type,
      person: {
        id: item.person.id,
        name: item.person.name,
        image: item.person.image,
      },
    }));
    return crew;
  } catch (error) {
    console.error("Failed to fetch crew:", error);
    return [];
  }
};
