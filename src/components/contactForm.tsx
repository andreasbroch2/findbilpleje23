import { useState } from 'react';

export default function contactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
            }),
        });
        const data = await response.json();
        console.log(data)
        return data;
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='form' id="stedform">
                <label className="mb-6" htmlFor="sted">Vælg dit område:</label>
                <select className="my-4 text-black" id="sted" name="stedlist" form="stedform">
                    <option value="koebenhavn">København</option>
                    <option value="aarhus">Århus</option>
                    <option value="aalborg">Aalborg</option>
                    <option value="odense">Odense</option>
                </select>
                <div className="text-center">
                    <button className='btn' type="submit">Find bilplejer</button>
                </div>
            </form>
        </>
    );
}

