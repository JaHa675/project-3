module.exports = {
    mageAttack: (level, bossDefense) => {
        const damage = 2 * level / bossDefense;
        return damage
    },
    warriorAttack: (level, bossDefense) => {
        const damage = 1.5 * level / bossDefense * .75;
        return damage
    },
    defend: (level) =>{
        const block = 4 * level;
        return block
    },
    dahliaAttack: () =>  {
        const damage = 1;
        return damage
    },
    jamesAttack: () =>  {
        const damage = 2;
        return damage
    },
    lucasAttack: () =>  {
        const damage = 3;
        return damage
    },
    brookeAttack: () =>  {
        const damage = 4;
        return damage
    },
    catAttack: () =>  {
        const damage = 6;
        return damage
    }
}