-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2022 at 11:29 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `unnc_team_2021-07-p16`
--
CREATE DATABASE IF NOT EXISTS `unnc_team_2021-07-p16` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `unnc_team_2021-07-p16`;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `machine` int(11) NOT NULL,
  `name` varchar(128) COLLATE utf8_bin NOT NULL,
  `startdate` datetime NOT NULL DEFAULT current_timestamp(),
  `enddate` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `priority` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `machine`
--

CREATE TABLE `machine` (
  `machineid` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedule` (
  `scheduleid` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `uid` int(11) NOT NULL,
  `script` text NOT NULL,
  `timelength` int(11),
  `result` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `status` tinyint(1) NOT NULL,
  `errlog` varchar(255) COLLATE utf8_bin,
  `description` varchar(512) COLLATE utf8_bin,
  `startdate` datetime NOT NULL DEFAULT current_timestamp(),
  `uuid` varchar(64)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `token` (
  `token` varchar(128) COLLATE utf8_bin NOT NULL,
  `datecreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateexpire` timestamp NULL DEFAULT NULL,
  `rank` int(1) NOT NULL,
  `uses` int(11) DEFAULT 1,
  `disabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`token`, `datecreated`, `dateexpire`, `rank`, `uses`, `disabled`) VALUES
('aaaaa', '2022-01-08 12:55:22', NULL, 0, 0, 0),
('aaaaaa', '2022-01-08 14:01:49', NULL, 0, 0, 0),
('abc', '2022-01-08 13:20:21', NULL, 0, 1, 0),
('asd', '2022-01-08 14:01:18', '2022-01-01 14:01:09', 0, 1, 0),
('gsffds', '2022-01-08 13:20:33', '2022-01-31 13:20:24', 0, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uid` int(11) NOT NULL,
  `username` varchar(16) COLLATE utf8_bin NOT NULL,
  `displayname` varchar(64) COLLATE utf8_bin NOT NULL,
  `password` varchar(256) COLLATE utf8_bin NOT NULL,
  `datecreated` datetime NOT NULL DEFAULT current_timestamp(),
  `rank` int(1) NOT NULL DEFAULT 0,
  `disabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uid`, `username`, `displayname`, `password`, `datecreated`, `rank`, `disabled`) VALUES
(1, 'admin', 'admin', 'admin', '2022-01-07 18:47:37', 3, 0),
(2, 'asdas', 'sadasd', '?l?ԤIA?R?<r?p', '2022-01-14 17:42:00', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `machine`
--
ALTER TABLE `machine`
  ADD PRIMARY KEY (`machineid`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`scheduleid`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`token`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `username_2` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `machine`
--
ALTER TABLE `machine`
  MODIFY `machineid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `scheduleid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
