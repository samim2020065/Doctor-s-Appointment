import SSLCommerzPayment from 'sslcommerz-lts'
import appointmentModel from '../models/appointmentModel.js'

const store_id = process.env.SSL_STORE_ID
const store_passwd = process.env.SSL_STORE_PASSWORD
const is_live = false

// INIT PAYMENT
export const initPayment = async (req, res) => {
    try {
        const userId = req.userId   
        const { appointmentId } = req.body

        const appointment = await appointmentModel.findById(appointmentId)

        const data = {
            total_amount: appointment.amount,
            currency: 'BDT',
            tran_id: appointmentId,

            success_url: 'http://localhost:4000/api/payment/success',
            fail_url: 'http://localhost:4000/api/payment/fail',
            cancel_url: 'http://localhost:4000/api/payment/cancel',

            product_name: 'Doctor Appointment',
            product_category: 'Service',
            product_profile: 'general',

            cus_name: appointment.userData.name,
            cus_email: appointment.userData.email,
            cus_add1: 'Dhaka',
            cus_city: 'Dhaka',
            cus_country: 'Bangladesh',
            cus_phone: '01700000000'
        }

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        const apiResponse = await sslcz.init(data)

        res.json({ success: true, url: apiResponse.GatewayPageURL })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const paymentSuccess = async (req, res) => {
    try {
        const { tran_id } = req.body

        await appointmentModel.findByIdAndUpdate(tran_id, {
            payment: true,
            paymentStatus: "Paid"
        })

        res.redirect('http://localhost:5173/my-appointments')

    } catch (error) {
        console.log(error)
    }
}

export const paymentFail = (req, res) => {
    res.redirect('http://localhost:5173/my-appointments')
}

export const paymentCancel = (req, res) => {
    res.redirect('http://localhost:5173/my-appointments')
}