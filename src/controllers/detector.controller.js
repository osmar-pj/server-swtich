import Detector from '../models/Detector'

export const createDetector = async (req, res) => {
    try {
        const createDetector = new Detector(req.body)
        await createDetector.save()

        res.status(200).json({
            saved: true
        })
    } catch (error) {
        console.error(error)
    }
}

export const getDetectors = async (req, res) => {
    try {
        const detectors = await Detector.find()
        res.status(200).json({detectors})
    } catch (error) {
        console.error(error)
    }
}

export const getDetector = async (req, res) => {
    try {
        const {id} = req.params
        const detector = await Detector.find({_id: id})
        res.status(200).json({detector})
    } catch (error) {
        console.error(error)
    }
}

export const updateDetector = async (req, res) => {
    try {
        const {id} = req.params
        const uptDetector = req.body
        const detector = await Detector.findById(id)
        await detector.updateOne({sensors: uptDetector.sensors})
        res.status(200).json({updated: true})
    } catch (error) {
        console.error(error)
    }
}