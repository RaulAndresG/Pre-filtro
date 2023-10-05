import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from "axios";
import { useHistory } from "react-router";

export default function Update() {
  let history = useHistory();
  const [_id, setID] = useState(null);
  const [nombre, setFirstName] = useState('');
  const [cargo, setLastName] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    setID(localStorage.getItem('ID'))
    setFirstName(localStorage.getItem('Nombre'))
    setLastName(localStorage.getItem('Apellido'))
    setCheckbox(localStorage.getItem('Autorizacion'))
  }, []);

  const updateAPIData = () => {
    axios.put(`http://localhost:8001/api/Empleados/`, {
      nombre,
      cargo,
      checkbox
    }).then(() => {
      history.push('/')
    })
  }

  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>Nombre</label>
          <input placeholder="Nombre" value={nombre} onChange={(e) => setFirstName(e.target.value)} ></input>
        </Form.Field>
        <Form.Field>
          <label>Apellido</label>
          <input placeholder="Apellido" value={cargo} onChange={(e) => setLastName(e.target.value)} ></input>
        </Form.Field>
        <Form.Field>
          <Checkbox label="Acepto los términos y condiciones:" checked={checkbox} onChange={() => setCheckbox(!checkbox)} ></Checkbox>
        </Form.Field>
        <Button type="submit" onClick={updateAPIData}>Actualizar</Button>
      </Form>
    </div>
  );
}
