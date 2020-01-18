export const createMutex = (context: string[]) => {
    return class Mutex {
        public id: string;

        constructor(id: string) {
            this.id = id;
        }

        public run = (callback: () => void) => {
            if (!this.isLocked()) {
                callback();
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