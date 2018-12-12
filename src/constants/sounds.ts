import JarbreakSound from '../../sounds/jarbreak.wav';
import DoorSound from '../../sounds/door.wav';
import ChestSound from '../../sounds/chestbig.wav';
import SwitchSound from '../../sounds/switch.wav';
import FootSound from '../../sounds/foot.wav';
import BackgroundSound from '../../sounds/background.mp3';

export interface GameSound {
    src: string,
    type: GameSoundType
}

export enum GameSoundType {
    JarbreakSound = 1,
    DoorSound,
    ChestSound,
    SwitchSound,
    FootSound,
    BackgroundSound
}

export const gameSounds: Array<GameSound> = [
    {
        src: JarbreakSound,
        type: GameSoundType.JarbreakSound
    },
    {
        src: DoorSound,
        type: GameSoundType.DoorSound
    },
    {
        src: ChestSound,
        type: GameSoundType.ChestSound
    },
    {
        src: SwitchSound,
        type: GameSoundType.SwitchSound
    },
    {
        src: FootSound,
        type: GameSoundType.FootSound
    },
    {
        src: BackgroundSound,
        type: GameSoundType.BackgroundSound
    }
];