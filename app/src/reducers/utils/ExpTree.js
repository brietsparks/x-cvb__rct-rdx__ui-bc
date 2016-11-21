import 'lodash';

import SinglyLinkedList from '../../utils/SinglyLinkedList';

export default class ExpTree {

    constructor(exps, hasRootEgg) {
        this.exps = _.cloneDeep(exps);
        this.hasRootEgg = hasRootEgg;
    }

    assignId(hashId, id) {
        let exp = findExp(hashId, this.exps);

        exp.id = id;
        exp.hashId = hashId;

        if (exp.parent_id) {
            let parent = findExp(exp.parent_id, this.exps, 'id');
            parent.hasEgg = false;
        } else {
            this.hasRootEgg = false;
        }

        return this;
    }

    changeFieldValue(hashId, field, value) {
        const exp = findExp(hashId, this.exps);

        if(_.isArray(exp[field])) {
            exp[field] = _.cloneDeep(value);
        } else {
            exp[field] = value;
        }

        return this;
    }

    appendNew(userId, hashId) {
        // the array of top level Exps
        const rootExps = this.exps;

        let exps, // the array to append to
            parentId = null;

        // append as a child of an Exp
        if (hashId) {
            const parent = findExp(hashId, rootExps);
            parent.hasEgg = true;
            if (!parent.children) {
                parent.children = [];
            }
            exps = parent.children;
            parentId = parent.id;

        // append as a root Exp
        } else {
            this.hasRootEgg = true;
            exps = rootExps;
        }

        const nextId = _.first(exps) ? _.first(exps).id : null;

        const newExp = {...newExp,
            parent_id: parentId,
            next_id: nextId,
            user_id: userId
        };

        exps.unshift(newExp);

        return this;
    }

    remove(hashId) {
        const rootExps = this.exps, // the array of top level Exps
            exp = findExp(hashId, rootExps);

        let exps, // array of exps that has the removable exp
            index;

        // get the exp array that has the exp to be removed
        if (exp.parent_id) {
            exps = findExp(exp.parent_id, rootExps, 'id').children;
        } else {
            exps = rootExps;
        }

        // remove the exp from the array
        index = exps.indexOf(exp);
        if (index !== -1) {
            exps.splice(index, 1);
        }

        return this;
    }

    addHashIds() {
        _.each(this.exps, exp => addHashIds(exp));

        return this;
    }

    getTree(unsorted) {
        if (!unsorted) {
            this.exps = sortExps(this.exps);
        }

        return this.exps;
    }

}

function sortExps(exps) {
    const linkedList = new SinglyLinkedList(exps);

    exps = linkedList.getList();

    _.each(exps, exp => {
        if (exp.children && exp.children.length > 0) {
            exp.children = sortExps(exp.children);
        }
    });

    return exps;
}

function findExp(key, exps, keyName) {
    keyName = keyName || 'hashId';

    let i, exp, result;
    for(i = 0; i < exps.length; i++) {
        exp = exps[i];
        if (exp[keyName] === key) {
            return exp;
        }
        const children = exp.children;
        if (children && children.length > 0) {
            result = findExp(key, children, keyName);
            if (result) {
                return result;
            }
        }
    }
}


function addHashIds(exp) {
    exp.hashId = hash(String(exp.id));

    if(exp.children) {
        _.each(exp.children, child => addHashIds(child));
    }
}

function hash(str) {
    var hash = 5381,
        i    = str.length

    while(i)
        hash = (hash * 33) ^ str.charCodeAt(--i)

    return hash >>> 0;
}

function tempHashId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

const newExp = {
    children: [],
    explanation: null,
    hashId: tempHashId(),
    id: null,
    parent_id: null,
    next_id: null,
    skills: [],
    summary: null,
    title: null,
    type: null,
    updated_at: null,
    created_at: null,
    user_id: null,
    uncreatedChild: false
};

// {
//     children: [],
//         explanation: null,
//     hashId: tempHashId(),
//     id: null,
//     parent_id: parentId,
//     next_id: nextId,
//     skills: [],
//     summary: null,
//     title: null,
//     type: null,
//     updated_at: null,
//     created_at: null,
//     user_id: userId,
//     uncreatedChild: false
// };