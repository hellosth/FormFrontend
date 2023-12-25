import React, { useState } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forms = () => {
    const URL =process.env.REACT_APP_BASE_URL;
    const [stops, setStops] = useState(['']);
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        busServiceName: "",
        startPoint: "",
        // "stops": [],
        endPoint: "",
        message: "",
    })


    // Function to handle adding a new stop
    const addStop = () => {
        setStops([...stops, '']);
    };

    // Function to handle input change for stops
    const handleStopChange = (index, value) => {
        const newStops = [...stops];
        newStops[index] = value;
        setStops(newStops);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (!values.startPoint || !values.endPoint || stops[0] === '') {
            if (!values.startPoint) {
                toast.error('Please enter Start Point');
                setIsLoading(false);

            }
            if (!values.endPoint) {
                toast.error('Please enter End Point');
                setIsLoading(false);

            }
            if (stops[0] === '') {
                toast.error('Please add at least one Stop');
                setIsLoading(false);
            }
            return;
        }
        const nvalues = { ...values, stops: stops };
        try {
            const res = await fetch(`${URL}/adddata`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set Content-Type header
                },
                body: JSON.stringify(nvalues), // Convert data to JSON string
            });
            const reqRes = await res.json();
            setValues({
                busServiceName: "",
                startPoint: "",
                endPoint: "",
                message: ''
            })
            setStops([''])
            setIsLoading(false);
            if (reqRes.success) {
                toast.success(reqRes.message)
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const handleInputChange = (name, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };
    return (
        <>
            <div className="container col-lg-6 shadow p-3 my-3 bg-body rounded">
                <h1>Data Collection</h1>
                <p className="text-muted">
                    This is a Form For data collection for our minor project. Please help us
                    by providing the routes of public vehicles in Kathmandu Valley as much
                    as possible.
                </p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="busServiceName">
                        <Form.Label>Bus Service Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="E.g. Sajha Yatayat"
                            value={values.busServiceName}
                            onChange={(e) => handleInputChange("busServiceName", e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="startPoint">
                        <Form.Label>Start Point<span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="E.g. Lagankhel"
                            value={values.startPoint}
                            onChange={(e) => handleInputChange("startPoint", e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="stops">
                        <Form.Label>Stops<span className="text-danger">*</span></Form.Label>
                        <div className="d-flex flex-column w-75">
                            {stops.map((stop, index) => (
                                <Form.Control
                                    key={index}
                                    type="text"
                                    placeholder={`Stop  ${index + 1}`}
                                    value={stop}
                                    className="mb-2"
                                    onChange={(e) => handleStopChange(index, e.target.value)}
                                />
                            ))}
                            <Button type="button" onClick={addStop}>
                                <i className="fa-solid fa-plus"></i>
                            </Button>
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3 w-75" controlId="endPoint">
                        <Form.Label>End Point<span className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="E.g. Gongabu Buspark"
                            value={values.endPoint}
                            onChange={(e) => handleInputChange("endPoint", e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 w-75" controlId="message">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Any Suggestions are appreciated"
                            value={values.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}  // Change "endPoint" to "message"
                        />
                    </Form.Group>


                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Submitting" : "Submit"}
                    </Button>

                </Form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Forms;