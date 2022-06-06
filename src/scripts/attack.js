module.exports = {
    mageAttack: (level, bossDefense) => {
        const damage = 2 * level / bossDefense;
        return damage
    },
    warriorAttack: (level, bossDefense) => {
        const damage = 1.5 * level / bossDefense * .75;
        return damage
    }
}