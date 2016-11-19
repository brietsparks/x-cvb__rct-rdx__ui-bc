export class SinglyLinkedList {
    constructor(items, {key = 'id', nextKey = 'next_id'}) {
        this.items = items;
        this.key = key;
        this.nextKey = nextKey;
    }

    sort(items) {
        const anchor = _.find(items, item => item[this.nextKey] === null);

        anchor.priority = 0;

        this.setPriorities(items, anchor, anchor.priority);

        return _.sortBy(items, 'priority').reverse();
    }

    setPriorities(items, currentItem, priority) {
        if(currentItem.children && currentItem.children.length > 0) {
            currentItem.children = this.sortItems(currentItem.children);
        }

        const prevItem = _.find(items, item => item[this.nextKey] === currentItem[id]);

        if (prevItem) {
            prevItem.priority = priority + 1;

            this.setPriorities(items, prevItem, prevItem.priority);
        }
    }

    remove(items, id) {
        const nextKey = this.nextKey;

        const item = _.find(items, items => item[this.key] === id);

        const prevItem = _.find(items, item => item[nextKey] === id);

        if (prevItem) {
            prevItem[nextKey] = item[nextKey];
        }

        item[nextKey] = null;

        return item;
    }

    insert(items, item, {nextId, prevId}) {
        const key = this.key;
        const nextKey = this.nextKey;

        if (nextId) {
            const nextItem = _.find(items, item => item[key] === nextId);

            item[nextKey] = nextItem[key];

            prevId = _.find(items, item => item[nextKey] === nextItem[key]);
        }

        const prevItem = _.find(items, item => item[key] === prevId);

        item[nextKey] = prevItem[nextKey];

        prevItem[nextKey] = item[key];

    }
}


