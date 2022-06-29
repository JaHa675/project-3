module.exports = {
    mageAttack: (level, bossDefense) => {
        const damage = 4 * level / bossDefense;
        return damage
    },
    warriorAttack: (level, bossDefense) => {
        const damage = 3 * level / bossDefense * .5;
        return damage
    },
    defend: (level) => {
        const block = 2 * level + 1;
        return block
    },
    dahliaAttack: () =>  {
        const damage = 1;
        return damage
    },
    jamesAttack: () =>  {
        const damage = 1;
        return damage
    },
    lucasAttack: () =>  {
        const damage = 1;
        return damage
    },
    brookeAttack: () =>  {
        const damage = 1;
        return damage
    },
    catAttack: () =>  {
        const damage = 2;
        return damage
    }
}