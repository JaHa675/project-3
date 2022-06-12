module.exports = {
    mageAttack: (level, bossDefense) => {
        const damage = 2 * level / bossDefense;
        return damage
    },
    warriorAttack: (level, bossDefense) => {
        const damage = 1.5 * level / bossDefense * .75;
        return damage
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
        const damage = 1;
        return damage
    }
}