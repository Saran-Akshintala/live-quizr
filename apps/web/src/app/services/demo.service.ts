import { Injectable } from '@angular/core';

export interface DemoQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface DemoParticipant {
  id: string;
  name: string;
  score: number;
}

export interface DemoEvent {
  id: string;
  name: string;
  description: string;
  sponsors: string[];
  questions: DemoQuestion[];
  participants: DemoParticipant[];
}

@Injectable({ providedIn: 'root' })
export class DemoService {
  private demoEvent: DemoEvent = this.buildDemoEvent();

  private buildDemoEvent(): DemoEvent {
    const questions: DemoQuestion[] = Array.from({ length: 5 }).map((_, i) => ({
      id: `q${i+1}`,
      text: `Sample question ${i+1}?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctIndex: i % 4,
    }));

    const participants: DemoParticipant[] = Array.from({ length: 10 }).map((_, i) => ({
      id: `p${i+1}`,
      name: `Player ${i+1}`,
      score: Math.floor(Math.random() * 100),
    }));

    const sponsors = ['Acme Corp', 'Globex', 'Initech', 'Umbrella Co'];

    return {
      id: 'demo',
      name: 'Demo Event',
      description: 'Client-only demo event for quick browsing.',
      sponsors,
      questions,
      participants,
    };
  }

  getEvent(id: string): DemoEvent | null {
    if (id === 'demo') return this.demoEvent;
    return null;
  }

  listEvents(): Pick<DemoEvent, 'id' | 'name' | 'description'>[] {
    return [{ id: 'demo', name: this.demoEvent.name, description: this.demoEvent.description }];
  }

  leaderboard(id: string): DemoParticipant[] {
    const ev = this.getEvent(id);
    if (!ev) return [];
    return [...ev.participants].sort((a, b) => b.score - a.score);
  }
}
