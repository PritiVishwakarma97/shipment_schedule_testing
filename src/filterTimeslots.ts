class FilterTimeSlots {

    /**A dummy function: This function just prints the values and returns an empty array */
    filterValidTime(
        timeslots: string[],
        locationId: number,
        truckType: string,
        LPInboundOperatingHrs: string
    ) {
        console.log(timeslots);
        console.log(locationId);
        console.log(truckType);
        console.log(LPInboundOperatingHrs);
        return [""];
    }
}

export default FilterTimeSlots;
