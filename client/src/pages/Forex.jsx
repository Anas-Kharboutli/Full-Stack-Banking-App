import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { useTranslation } from 'react-i18next';

const Forex = () => {
    const [rates, setRates] = useState({});
    const [base, setBase] = useState('EUR');
    const [loading, setLoading] = useState(true);

    const { t } = useTranslation();
    

    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true);
            const BASE_URL = 'https://open.er-api.com/v6/latest';
            try {
                const response = await axios.get(`${BASE_URL}/${base}`);
                setRates(response.data.rates);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching rates:', error);
                setLoading(false);
            }
        };

        fetchRates();
    }, [base]);

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <Card 
    title={"Forex"}
    warning={""}
    body={
        <div className="App">
        <h1>{t("Forex.Exchange Rates")}</h1>
        <div>
            <label htmlFor="base">{t("Forex.Base Currency")}: </label>
            <select id="base" value={base} onChange={(e) => setBase(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="PLN">PLN</option>
                {/* Add more options as needed */}
            </select>
        </div>
        <table>
            <thead>
                <tr>
                    <th>{t("Forex.Currency")}</th>
                    <th>{t("Forex.Rate")}</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(rates).map((currency) => (
                    <tr key={currency}>
                        <td>{currency}</td>
                        <td>{rates[currency]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    }

    />

   
  )
}

export default Forex
