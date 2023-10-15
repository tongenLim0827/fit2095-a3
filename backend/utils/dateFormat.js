class DateFormat{
    /**
     * This is a utils class which sets the specific format of the date and time
    */
    static formatDate(date){
        const options = { 
            day: '2-digit', 
            month: '2-digit', 
            year: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        };

        return date.toLocaleDateString('en-US',options)
    }

    static formatTime = (minutes) => {
        const hours = (minutes/60) - (minutes/60)%1
        const r_minutes = (minutes/60)%1 * 60
        return hours > 0 ? `${hours} hour(s) ${r_minutes} minute(s)` : `${r_minutes} minute(s)`
    }
}

module.exports = DateFormat;
