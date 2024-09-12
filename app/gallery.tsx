"use client";

import { useState, useMemo } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

import Controls from "./controls";
import Modal from "./modal";

import { User } from "./types/user";

export type GalleryProps = {
  users: User[];
};
const Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sortBy, setSortBy] = useState<undefined | string>(undefined);
  const [sortOrder, setSortOrder] = useState<undefined | string>(undefined);

  const handleSortChange = (sortByValue: undefined | string, sortOrderValue: undefined | string) => {
    setSortBy(sortByValue);
    setSortOrder(sortOrderValue);
  }

  /* const sortedUsers = useMemo(() => {
    return [...usersList].sort(function (a, b) {
      if (sortBy === 'name') {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      } else if (sortBy === 'company') {
        if (a.company.name.toLowerCase() < b.company.name.toLowerCase()) {
          return -1;
        }
        if (a.company.name.toLowerCase() > b.company.name.toLowerCase()) {
          return 1;
        }
        return 0;
      } else if (sortBy === 'email') {
        if (a.email.toLowerCase() < b.email.toLowerCase()) {
          return -1;
        }
        if (a.email.toLowerCase() > b.email.toLowerCase()) {
          return 1;
        }
        return 0;
      }
  
      return 0;
    });
  }, [usersList, sortBy]); */

  const sortedUsers = useMemo(() => {
    return [...usersList].sort((a, b) => {
      const getValue = (obj: any, key: string) => {
        switch (key) {
          case "name":
            return obj.name.toLowerCase();
          case "company":
            return obj.company.name.toLowerCase();
          case "email":
            return obj.email.toLowerCase();
          default:
            return "";
        }
      };
  
      if (sortBy) {
        const valueA = getValue(a, sortBy);
        const valueB = getValue(b, sortBy);
  
        if (sortOrder === 'ascending') {
          if (valueA < valueB) return -1;
          if (valueA > valueB) return 1;
        } else if (sortOrder === 'descending') {
          if (valueA > valueB) return -1;
          if (valueA < valueB) return 1;
        }
      }
  
      return 0;
    });
  }, [usersList, sortBy, sortOrder]);

  const handleModalOpen = (id: number) => {
    const user = usersList.find((item) => item.id === id) || null;

    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const checker = sortBy && sortOrder && sortedUsers;
  const listToMap = checker ? sortedUsers : usersList;

  console.log('list to map', listToMap);
  console.log(sortedUsers);
  console.log(sortBy, sortOrder);

  return (
    <div className="user-gallery">
      <div className="heading">
        <h1 className="title">Users</h1>
        <Controls onSortChange={handleSortChange}/>
      </div>
      <div className="items">
        {listToMap.map((user, index) => (
          <div
            className="item user-card"
            key={index}
            onClick={() => handleModalOpen(user.id)}
          >
            <div className="body">
              <Avatar
                size={96}
                name={user.name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="company">{user.company.name}</div>
            </div>
          </div>
        ))}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      name={selectedUser.name}
                      variant="marble"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                  </div>
                  <div className="name">
                    {selectedUser.name} ({selectedUser.username})
                  </div>
                  <div className="field">
                    <FaLocationDot className="icon" />
                    <div className="data">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="fields">
                    <FaEnvelope className="icon" />
                    <div className="value">{selectedUser.email}</div>
                  </div>
                  <div className="company">
                    <div className="name">{selectedUser.company.name}</div>
                    <div className="catchphrase">
                      {selectedUser.company.catchPhrase}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
