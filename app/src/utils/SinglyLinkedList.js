import 'lodash';

export default class SinglyLinkedList {
    constructor(items, key = 'id', nextKey = 'next_id') {
        this.items = items;
        this.key = key;
        this.nextKey = nextKey;

    }

    getList() {
        return getLinkedItems(this.items, this.key, this.nextKey);
    }

    remove(id) {
        const items = this.items,
            nextKey = this.nextKey,
            item = _.find(items, item => item[this.key] === id),
            prevItem = _.find(items, item => item[nextKey] === id);

        if (prevItem) {
            prevItem[nextKey] = item[nextKey];
        }

        item[nextKey] = null;

        const index = items.indexOf(item);

        items.splice(index, 1);

        this.items = items;

        return item;
    }

    insert(item, {before, after}) {
        let insertIndex,
            prevItem;
        const items = this.items,
            key = this.key,
            nextKey = this.nextKey;

        if (!before && !after) {
            throw new Error("Inserting into SinglyLinkedList requires a before or after id. Neither are set");
        }

        if (item[key] === before || item[key] === after) {
            throw new Error(`Cannot insert an item before/after itself in a SinglyLinkedList.`);
        }

        if (before) {
            const nextItem = _.find(items, item => item[key] === before);

            insertIndex = items.indexOf(nextItem);

            item[nextKey] = nextItem[key];

            prevItem = _.find(items, item => item[nextKey] === nextItem[key]);
        } else {
            prevItem = _.find(items, item => item[key] === after);
        }

        if (prevItem) {
            insertIndex = items.indexOf(prevItem) + 1;

            item[nextKey] = prevItem[nextKey];

            prevItem[nextKey] = item[key];
        }

        items.splice(insertIndex, 0, item);
    }
}

function getLinkedItems(items, key, nextKey) {
    const anchor = _.find(items, item => item[nextKey] === null);

    anchor.priority = 0;

    setPriorities(items, anchor, anchor.priority, key, nextKey);

    return _.sortBy(items, 'priority').reverse();
}

function setPriorities(items, currentItem, priority, key, nextKey) {
    const prevItem = _.find(items, item => item[nextKey] === currentItem[key]);

    if (prevItem) {
        prevItem.priority = priority + 1;

        setPriorities(items, prevItem, prevItem.priority, key, nextKey);
    }
}