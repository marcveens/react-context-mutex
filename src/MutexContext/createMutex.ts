export type MutexRunner = new (id: string) => {
    id: string;
    /** Runs the mutex callback in case it's not locked */
    run: (resolveCallback: () => void, rejectCallback?: () => void) => void;
    /** Locks the mutex instance */
    lock: () => void;
    /** Unlocks the mutex instance */
    unlock: () => void;
    /** Shows whether the mutex instance is locked or not */
    isLocked: () => boolean;
};

export const createMutex = (context: string[]): MutexRunner => {
    return class Mutex {
        public id: string;

        constructor(id: string) {
            this.id = id;
        }

        public run = (resolveCallback: () => void, rejectCallback?: () => void) => {
            if (!this.isLocked()) {
                resolveCallback();
            } else {
                if (rejectCallback && typeof rejectCallback === 'function') {
                    rejectCallback();
                }
            }
        }

        public lock = () => {
            if (!this.isLocked()) {
                context.push(this.id);
            }
        }

        public unlock = () => {
            const index = context.indexOf(this.id);

            if (index > -1) {
                context.splice(index, 1);
            }
        }

        public isLocked = () => {
            return context.indexOf(this.id) > -1;
        }
    };
};