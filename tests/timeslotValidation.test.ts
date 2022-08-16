import FilterTimeSlots from "../src/filterTimeslots";
import TruckType from '../src/truckTypes'

describe("Verify Filter Timeslots functionality", () => {

    beforeAll(() => {

        /** Creating a mock for 'filterValidTime' function
         * This function takes 4 parameters: timeslots, locationId, truckType and inboundOperationHrs
         * and returns an array of dummy values
         */
        jest.spyOn(FilterTimeSlots.prototype, 'filterValidTime').mockImplementation(( timeslots: string[],
            locationId: number,
            truckType: string,
            inboundOperationHrs: string)=>{
                
            if (locationId === 1 && truckType === TruckType.DRY_VAN) {
                return timeslots.filter((timeSlot, index) => {
                    return (index + 1) % 2 !== 0 ? true : false; // return elements of odd positions
                });
            }
            if (inboundOperationHrs === "4pm-5pm") {
                return []; // return an empty array
            } else {
                return timeslots.filter((timeSlot, index) => {
                    return (index + 1) % 2 === 0 ? true : false; // return elements of even positions
                });
            }
            
        });
    });
    
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Test when truckType is 'DRY_VAN'", () => {

        /** When trucType='DRY_VAN' and location=1, 
         * expected output is an array of elements of odd position */

        const details = {
            timeSlots: [
                "June 2, 2022 10:45pm - June 3, 2022 9am",
                "Tuesday 12pm - Tuesday 13pm",
                "Fri 6am - Fri 7am",
            ],
            location: 1,
            truckType: TruckType.DRY_VAN,
            inboundOperatingHrs: "10am - 5pm",
        };

        const filter = new FilterTimeSlots();
        const actualTimeslots = filter.filterValidTime( // calling filterValidTime function
            details.timeSlots,
            details.location,
            details.truckType,
            details.inboundOperatingHrs
        );

        expect(actualTimeslots.length).toBe(2); // checking if we get 2 elements after filteration
        expect(actualTimeslots).toEqual([ //checking for elements at odd positions - 1st and 2nd
            details.timeSlots[0], 
            details.timeSlots[2],
        ]);
    });

    test("Test when truckType is 'REEFER'", () => {

        /** When trucType='REEFER', 
         * expected output is an array of elements of even position */

        const details = {
            timeSlots: [
                "June 2, 2022 10:45pm - June 3, 2022 9am",
                "Tuesday 12pm - Tuesday 1pm",
                "Fri 6am - Fri 7am",
            ],
            location: 2,
            truckType: TruckType.REEFER,
            inboundOperatingHrs: "6am-5pm",
        };

        const filter = new FilterTimeSlots();
        const actualTimeslots = filter.filterValidTime(
            details.timeSlots,
            details.location,
            details.truckType,
            details.inboundOperatingHrs
        );

        expect(actualTimeslots.length).toBe(1); // checking if we get 1 element after filteration
        expect(actualTimeslots).toContain(details.timeSlots[1]); //checking for element at event position
    });

    test("Test when timeslots doesn't contain Inbound operating hours", () => {

        /** When timeslots doesn't contain Inbound operating hours', 
         * expected output is an an empty array */

        const details = {
            timeSlots: [
                "June 2, 2022 10:45pm - June 3, 2022 9am",
                "Tuesday 12pm - Tuesday 1pm",
                "Fri 6am - Fri 7am",
            ],
            location: 2,
            truckType: TruckType.DRY_VAN,
            inboundOperatingHrs: "4pm-5pm",
        };

        const filter = new FilterTimeSlots();
        const actualTimeslots = filter.filterValidTime(
            details.timeSlots,
            details.location,
            details.truckType,
            details.inboundOperatingHrs
        );

        expect(actualTimeslots.length).toBe(0); // check if returned array is empty
    });

    
});
