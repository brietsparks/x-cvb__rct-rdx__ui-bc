import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class ToolsStore extends EventEmitter {
    constructor() {
        super();
        this.tools = [
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
        this.tools.push({
            id,
            title
        });

        this.emit("change");
    }

    getAll() {
        return this.tools;
    }

    handleActions(action) {
        switch (action.type) {
            case "CREATE_TOOL":
                this.create(action.title);
        }
    }
}

const toolsStore = new ToolsStore();
dispatcher.register(toolsStore.handleActions.bind(toolsStore));
window.dispatcher = dispatcher;
export default toolsStore;