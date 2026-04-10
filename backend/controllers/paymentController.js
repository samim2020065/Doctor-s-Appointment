import SSLCommerzPayment from 'sslcommerz-lts'
import appointmentModel from '../models/appointmentModel.js'

const store_id = process.env.SSLCOMMERZ_STORE_ID
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD
const is_live = false
const clientUrl = 'https://doctor-s-appointment-puce.vercel.app' || 'http://localhost:5173'

// INIT PAYMENT
export const initPayment = async (req, res) => {
    try {
        const { appointmentId } = req.body

        const appointment = await appointmentModel.findById(appointmentId)

        if (!appointment) {
          return res.status(404).json({ success: false, message: 'Appointment not found' })
        }

        const data = {
            total_amount: appointment.amount,
            currency: 'BDT',
            tran_id: appointmentId,

            success_url: `${'https://your-backend.onrender.com' || 'http://localhost:4000'}/api/user/success`,
            fail_url: `${'https://your-backend.onrender.com' || 'http://localhost:4000'}/api/user/fail`,
            cancel_url: `${'https://your-backend.onrender.com' || 'http://localhost:4000'}/api/user/cancel`,

            product_name: 'Doctor Appointment',
            product_category: 'Service',
            product_profile: 'general',
            shipping_method: 'NO',
            num_of_item: 1,

            cus_name: appointment.userData.name,
            cus_email: appointment.userData.email,
            cus_add1: 'Dhaka',
            cus_city: 'Dhaka',
            cus_country: 'Bangladesh',
            cus_phone: appointment.userData.phone || '01700000000'
        }

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        const apiResponse = await sslcz.init(data)

        if (!apiResponse || !apiResponse.GatewayPageURL) {
            console.log('SSLCommerz init failed:', apiResponse)
            return res.json({ success: false, message: 'Payment gateway initialization failed' })
        }

        res.json({ success: true, url: apiResponse.GatewayPageURL })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const paymentSuccess = async (req, res) => {
    try {
        const tran_id = req.body.tran_id || req.body.tranid || req.query.tran_id

        if (!tran_id) {
            return res.status(400).send('Missing transaction id')
        }

        await appointmentModel.findByIdAndUpdate(tran_id, {
            payment: true,
            paymentStatus: 'Paid'
        })

        res.redirect(`${clientUrl}/my-appointments`)
    } catch (error) {
        console.log(error)
        res.status(500).send('Payment success processing failed')
    }
}

export const paymentFail = (req, res) => {
    res.redirect(`${clientUrl}/payment/fail`)
}

export const paymentCancel = (req, res) => {
    res.redirect(`${clientUrl}/payment/cancel`)
}
