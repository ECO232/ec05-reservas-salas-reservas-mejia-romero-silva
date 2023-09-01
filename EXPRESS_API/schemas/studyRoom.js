
const z = require('zod')

const studyRoomSchema = z.object({
    name: z.string({
        invalid_type_error: 'Study room name must be a String',
        required_error: 'Study room name is required'
    }),
    building: z.string({
        invalid_type_error: 'Study room building must be a String',
        required_error: 'Study room building is required'
    }).default("Unknown"),
    reservations: z.array({
        invalid_type_error: 'Study room reservations must be a Number',
        required_error: 'Study room reservations is required'
    }),
})

function validateStudyRoom(obj) {
    return studyRoomSchema.safeParse(obj); // safeParse vs parse
}

module.exports = {
    validateStudyRoom
}