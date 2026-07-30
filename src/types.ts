export type PageId = 
  | 'opening' 
  | 'no_redirect' 
  | 'password' 
  | 'hero' 
  | 'hub' 
  | 'moments' 
  | 'music' 
  | 'letter' 
  | 'cake' 
  | 'final';

export interface PhotoMoment {
  id: string;
  title: string;
  image: string;
  date: string;
  caption: string;
  sticker: string;
  rotation: string;
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  vibe: string;
  whyRemindsMe: string;
  color: string;
  freqPattern: number[];
}
