-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-06-15 18:30:54
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `webproject`
--

-- --------------------------------------------------------

--
-- 資料表結構 `player`
--

CREATE TABLE `player` (
  `MemberID` varchar(20) NOT NULL,
  `password` varchar(80) NOT NULL,
  `money` int(11) NOT NULL DEFAULT 100
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `player`
--

INSERT INTO `player` (`MemberID`, `password`, `money`) VALUES
('nick', '$2y$10$FU7I6o2hvWxwmQNwB7L3D.P5HpUFYJhRheIXhwcZhUnnkJSdicSOW', 100),
('test', '$2y$10$fncj5lYIxioSn7Nm9yeNVOm.El0B.BAhpHoPt7plwHiImwpSWrx0S', 100),
('wendy', '$2y$10$4E3q0MGH.MNmPdD8x2WW6.Y5ekEspQeFxrsDnTgl2jqO.RvBLX7Gq', 100);

-- --------------------------------------------------------

--
-- 資料表結構 `score`
--

CREATE TABLE `score` (
  `MemberID` varchar(20) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `score`
--

INSERT INTO `score` (`MemberID`, `score`) VALUES
('nick', 380),
('test', 0),
('wendy', 457);

-- --------------------------------------------------------

--
-- 資料表結構 `store`
--

CREATE TABLE `store` (
  `MemberID` varchar(20) NOT NULL,
  `itemID` int(11) NOT NULL,
  `number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `store`
--

INSERT INTO `store` (`MemberID`, `itemID`, `number`) VALUES
('wendy', 2, 0),
('wendy', 1, 0),
('nick', 1, 7),
('nick', 2, 6);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`MemberID`);

--
-- 資料表索引 `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`MemberID`),
  ADD KEY `MemberID` (`MemberID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
