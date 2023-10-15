class generateId {
    /**
     * This is a utils class which is used to generate a random id for each category/event
    */
    constructor(type) {
        this.type = type
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    gen_rand_id(length) {
        let result = '';
        const char_length = this.characters.length;
        for (let i = 0; i < length; i++) {
            result += this.characters.charAt(Math.floor(Math.random() * char_length));
        }
        if (this.type == 'C'){
            return `C${result}-${Math.floor(Math.random()*(9999-1000+1))}`;
        }
        else if (this.type == 'E'){
            return `E${result}-${Math.floor(Math.random()*(9999-1000+1))}`;
        }
    }
};

module.exports = generateId;
