export class SinglyLinkedList {
    constructor(items, key = 'id', nextKey = 'next_id') {
        this.items = items;
        this.key = key;
        this.nextKey = nextKey;
        this.list = getLinkedItems(items, key, nextKey);
    }

    getList() {
        return this.list;
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

function getLinkedItems(items, key, nextKey) {
    const anchor = _.find(items, item => item[nextKey] === null);

    anchor.priority = 0;

    setPriorities(items, anchor, anchor.priority, key, nextKey);

    return _.sortBy(items, 'priority').reverse();
}

function setPriorities(items, currentItem, priority, key, nextKey) {
    if(currentItem.children && currentItem.children.length > 0) {
        currentItem.children = sort(currentItem.children);
    }

    const prevItem = _.find(items, item => item[nextKey] === currentItem[key]);

    if (prevItem) {
        prevItem.priority = priority + 1;

        setPriorities(items, prevItem, prevItem.priority, key, nextKey);
    }
}


