'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Gallery from "./gallery";
import { useEffect, useState } from "react";

export default function Home() {
  // data from https://jsonplaceholder.typicode.com/users
  // since the placeholder api endpoint is already given, i used it to directly fetch the mock data from the public api.
  // deleted hard coded data

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect( () => {
    console.log('updated users', users)
  }, [users])

  return (
    <main className={styles.main}>
      <Gallery users={users} />
    </main>
  );
}
