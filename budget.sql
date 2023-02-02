-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2023 at 02:29 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `budget`
--

-- --------------------------------------------------------

--
-- Table structure for table `agencies`
--

CREATE TABLE `agencies` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `agencies`
--

INSERT INTO `agencies` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Agency 1', '2023-02-02 00:06:57', '2023-02-02 00:06:57'),
(2, 'Agency 2', '2023-02-02 00:06:57', '2023-02-02 00:06:57'),
(3, 'Agency 3', '2023-02-02 00:07:16', '2023-02-02 00:07:16');

-- --------------------------------------------------------

--
-- Table structure for table `budgetentries`
--

CREATE TABLE `budgetentries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `date` datetime NOT NULL,
  `revisedDate` datetime DEFAULT NULL,
  `status` enum('pending','approved','denied') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `agencyId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `budgetentries`
--

INSERT INTO `budgetentries` (`id`, `name`, `description`, `amount`, `date`, `revisedDate`, `status`, `createdAt`, `updatedAt`, `categoryId`, `agencyId`) VALUES
(1, 'user1', 'Description', 120, '2023-02-01 23:41:40', NULL, 'approved', '2023-02-01 23:41:40', '2023-02-01 23:41:40', 1, 1),
(2, 'user1', 'Description', 11111, '2023-02-01 23:41:52', NULL, 'approved', '2023-02-01 23:41:52', '2023-02-01 23:41:52', 3, 3),
(3, 'user1', 'sssssssssssssssssssss', 111, '2023-02-02 01:24:16', NULL, 'pending', '2023-02-02 01:24:16', '2023-02-02 01:24:16', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` enum('Salaries','Equipment','Supplies','Services') NOT NULL,
  `order` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `order`, `createdAt`, `updatedAt`) VALUES
(1, 'Salaries', 1, '2023-02-02 00:13:14', '2023-02-02 00:13:14'),
(2, 'Equipment', 1, '2023-02-02 00:13:14', '2023-02-02 00:13:14'),
(3, 'Supplies', 1, '2023-02-02 00:13:28', '2023-02-02 00:13:28'),
(4, 'Services', 1, '2023-02-02 00:13:28', '2023-02-02 00:13:28');

-- --------------------------------------------------------

--
-- Table structure for table `pastexpenses`
--

CREATE TABLE `pastexpenses` (
  `id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `AgencyId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('normal','director') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `agencyId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `type`, `createdAt`, `updatedAt`, `agencyId`) VALUES
(1, 'user1@gmail.com', '$2b$10$t1PeDXusCmNM38ZOmisxi.xzAgernxCS/U60CiGxABCe451lMG5kC', 'user1', 'normal', '2023-02-01 23:12:31', '2023-02-01 23:12:31', 1),
(2, 'director@gmail.com', '$2b$10$Z50Ln.fA9nkO.KWc/CyFLeP3SFZC4voeQnKAlcML.B7.Bsr7fhCWG', 'director', 'director', '2023-02-01 23:42:34', '2023-02-01 23:42:34', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agencies`
--
ALTER TABLE `agencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `budgetentries`
--
ALTER TABLE `budgetentries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `agencyId` (`agencyId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pastexpenses`
--
ALTER TABLE `pastexpenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `AgencyId` (`AgencyId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `agencyId` (`agencyId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agencies`
--
ALTER TABLE `agencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `budgetentries`
--
ALTER TABLE `budgetentries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pastexpenses`
--
ALTER TABLE `pastexpenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `budgetentries`
--
ALTER TABLE `budgetentries`
  ADD CONSTRAINT `budgetentries_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `budgetentries_ibfk_2` FOREIGN KEY (`agencyId`) REFERENCES `agencies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `pastexpenses`
--
ALTER TABLE `pastexpenses`
  ADD CONSTRAINT `pastexpenses_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `pastexpenses_ibfk_2` FOREIGN KEY (`AgencyId`) REFERENCES `agencies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`agencyId`) REFERENCES `agencies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
