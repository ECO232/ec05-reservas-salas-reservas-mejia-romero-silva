
const z = require('zod')

const reservationSchema = z.object({
    name: z.string({
        invalid_type_error: 'Reservation name must be a String',
        required_error: 'Reservation name is required'
    }),
    id: z.string({
        invalid_type_error: 'Reservation id must be a String',
        required_error: 'Reservation id is required'
    }),
    time: z.number({
        invalid_type_error: 'Reservation time must be a Number',
        required_error: 'Reservation time is required'
    }).int().min(7).max(18),
})

function validateReservation(obj) {
    return reservationSchema.safeParse(obj); // safeParse vs parse
}

module.exports = {
    validateReservation
}