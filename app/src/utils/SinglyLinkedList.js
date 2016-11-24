import 'lodash';

export default class SinglyLinkedList {
    constructor(items, tempKey = 'hashId', key = 'id', nextKey = 'next_id') {
        this.items = items;
        this.tempKey = tempKey;
        this.key = key;
        this.nextKey = nextKey;

    }

    getList() {
        return getLinkedItems(this.items, this.key, this.nextKey);
    }

    /**
     * Remove an item from the list and return any items whose nextKey got updated
     *
     * @param keyVal
     * @param byTempKey if true (default), the item removed by its tempKey value
     * @return {{previous, removal}}
     */
    remove(keyVal, byTempKey) {
        if (typeof byTempKey === "undefined" || byTempKey === null) {
            byTempKey = true;
        }

        // the permanent key
        const key = this.key;

        // the key by which the removable item will be found, either tempKey or permanent key
        const removalKey = byTempKey ? this.tempKey : this.key;

        const items = this.items,
            nextKey = this.nextKey,

            // the item to be removed... its removalKey equals the passed in keyVal
            removalItem = _.find(items, item => item[removalKey] === keyVal),

            // the one that comes before the removalItem... the one whose nextKey matches the removalItem's key
            prevItem = _.find(items, item => item[nextKey] === item[key]);

        if (prevItem) {
            prevItem[nextKey] = removalItem[nextKey]; // closes the gap
        }

        removalItem[nextKey] = null;

        const index = items.indexOf(removalItem);

        items.splice(index, 1);

        this.items = items;

        return {
            previous: prevItem,
            removal: removalItem
        };
    }

    insert(item, {before, after}) {
        let insertIndex,
            nextItem,
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
            nextItem = _.find(items, item => item[key] === before);

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

        return {
            insertion: item,
            previous: prevItem,
            next: nextItem
        }
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