import React, { useState, useEffect } from 'react';
import { fetchSeasons, fetchCast, fetchCrew } from '@/services/tvMazeApi';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ShowDetailsDrawerProps {
    showId: number | null;
}

interface Season {
  id: number;
  number: number;
  episodeOrder: number;
}

interface CastMember {
    person: {
      id: number;
      name: string;
      image?: { medium: string };
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
    image: { medium: string };
  };
}

export const ShowDetailsDrawer: React.FC<ShowDetailsDrawerProps> = ({ showId }) => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);

  useEffect(() => {
    if (showId) {
      fetchSeasons(showId).then(setSeasons);
      fetchCast(showId).then(setCast);
      fetchCrew(showId).then(setCrew);
    }
  }, [showId]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Show Details</Button>
      </DrawerTrigger>
      <DrawerContent style={{ maxWidth: '100vw', overflow: 'auto' }}>
        <DrawerHeader>
          <DrawerTitle>Show Details</DrawerTitle>
        </DrawerHeader>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
          {/* Seasons section */}
          <section style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <h3 className="font-semibold">Seasons</h3>
            {seasons.map(season => (
              <p key={season.id}>Season {season.number} - {season.episodeOrder} episodes</p>
            ))}
          </section>

          {/* Cast section */}
          <section style={{ maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 className="font-semibold">Cast</h3>
            {cast.map(({ person, character }) => (
              <div key={person.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {person.image && (
                  <Image src={person.image.medium} alt={person.name} width={50} height={50} className="rounded-full" />
                )}
                <p>{person.name} as {character.name}</p>
              </div>
            ))}
          </section>

          {/* Crew section */}
          <section style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <h3 className="font-semibold">Crew</h3>
            {crew.map(({type, person}) => (
              <div key={type + person.id}>
                <p>{type}: {person.name}</p>
              </div>
            ))}
          </section>
        </div>
        
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShowDetailsDrawer;
