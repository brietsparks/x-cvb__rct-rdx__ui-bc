import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class SkillsStore extends EventEmitter {
    constructor() {
        super();
        this.skills = [
            {
                id: 1,
                title: 'Linux'
            },
            {
                id: 2,
                title: 'Apache'
            },
            {
                id: 3,
                title: 'MySQL'
            },
            {
                id: 4,
                title: 'PHP'
            },
        ];
    }

    create(title) {
        const id = Date.now();
        this.skills.push({
            id,
            title
        });

        this.emit("change");
    }

    getAll() {
        return this.skills;
    }

    handleActions(action) {
        switch (action.type) {
            case "CREATE_SKILL":
                this.create(action.title);
        }
    }
}

const skillsStore = new SkillsStore();
dispatcher.register(skillsStore.handleActions.bind(skillsStore));
window.dispatcher = dispatcher;
export default skillsStore;