import Setpoint from '../models/Setpoint.js'

export const createSetpoint = async (req, res) => {
    try {
        const setpoint = new Setpoint(req.body)
        await setpoint.save()
        res.status(200).json({saved: true})
    } catch (error) {
        console.error(error)
    }
}