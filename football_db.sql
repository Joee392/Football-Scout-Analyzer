-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2025 at 01:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `football_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `team` varchar(100) NOT NULL,
  `league` varchar(50) NOT NULL,
  `appearances` int(11) DEFAULT 0,
  `goals` int(11) DEFAULT 0,
  `assists` int(11) DEFAULT 0,
  `scout_score` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `name`, `team`, `league`, `appearances`, `goals`, `assists`, `scout_score`) VALUES
(1, 'Erling Haaland', 'Manchester City', 'Premier League', 35, 36, 8, 95),
(4, 'Kylian Mbappé', 'PSG', 'Ligue 1', 34, 29, 7, 94),
(6, 'Mohamed Salah', 'Liverpool', 'Premier League', 34, 18, 10, 92),
(7, 'Kevin De Bruyne', 'Manchester City', 'Premier League', 25, 6, 15, 94),
(8, 'Bukayo Saka', 'Arsenal', 'Premier League', 33, 14, 11, 89),
(9, 'Phil Foden', 'Manchester City', 'Premier League', 34, 19, 8, 91),
(10, 'Cole Palmer', 'Chelsea', 'Premier League', 30, 21, 9, 90),
(11, 'Son Heung-min', 'Tottenham', 'Premier League', 31, 17, 7, 88),
(12, 'Bruno Fernandes', 'Manchester United', 'Premier League', 35, 10, 11, 87),
(13, 'Ollie Watkins', 'Aston Villa', 'Premier League', 36, 19, 10, 86),
(14, 'Declan Rice', 'Arsenal', 'Premier League', 35, 7, 8, 88),
(15, 'Alexander Isak', 'Newcastle', 'Premier League', 28, 20, 3, 85),
(16, 'Bernardo Silva', 'Manchester City', 'Premier League', 32, 6, 9, 89),
(17, 'Virgil van Dijk', 'Liverpool', 'Premier League', 34, 4, 2, 91),
(18, 'Martin Odegaard', 'Arsenal', 'Premier League', 33, 8, 10, 90),
(19, 'James Maddison', 'Tottenham', 'Premier League', 27, 4, 9, 84),
(20, 'Jarrod Bowen', 'West Ham', 'Premier League', 35, 16, 6, 83),
(21, 'Jude Bellingham', 'Real Madrid', 'La Liga', 28, 19, 6, 96),
(22, 'Vinicius Junior', 'Real Madrid', 'La Liga', 26, 15, 5, 94),
(23, 'Robert Lewandowski', 'Barcelona', 'La Liga', 33, 18, 8, 91),
(24, 'Antoine Griezmann', 'Atletico Madrid', 'La Liga', 34, 16, 6, 92),
(25, 'Lamine Yamal', 'Barcelona', 'La Liga', 30, 5, 8, 88),
(26, 'Federico Valverde', 'Real Madrid', 'La Liga', 35, 2, 7, 89),
(27, 'Rodrygo', 'Real Madrid', 'La Liga', 33, 10, 5, 87),
(28, 'Ilkay Gundogan', 'Barcelona', 'La Liga', 34, 5, 9, 88),
(29, 'Takefusa Kubo', 'Real Sociedad', 'La Liga', 29, 7, 4, 84),
(30, 'Artem Dovbyk', 'Girona', 'La Liga', 32, 20, 5, 85),
(31, 'Inaki Williams', 'Athletic Bilbao', 'La Liga', 31, 12, 3, 82),
(32, 'Isco', 'Real Betis', 'La Liga', 28, 8, 5, 86),
(33, 'Alexander Sorloth', 'Villarreal', 'La Liga', 32, 19, 6, 83),
(34, 'Pedri', 'Barcelona', 'La Liga', 22, 2, 4, 88),
(35, 'Nico Williams', 'Athletic Bilbao', 'La Liga', 29, 6, 11, 86),
(36, 'Jan Oblak', 'Atletico Madrid', 'La Liga', 35, 0, 0, 89),
(37, 'Harry Kane', 'Bayern Munich', 'Bundesliga', 32, 36, 8, 97),
(38, 'Florian Wirtz', 'Bayer Leverkusen', 'Bundesliga', 31, 11, 11, 93),
(39, 'Jamal Musiala', 'Bayern Munich', 'Bundesliga', 27, 10, 6, 92),
(40, 'Xavi Simons', 'RB Leipzig', 'Bundesliga', 32, 8, 11, 89),
(41, 'Victor Boniface', 'Bayer Leverkusen', 'Bundesliga', 23, 14, 8, 86),
(42, 'Leroy Sane', 'Bayern Munich', 'Bundesliga', 26, 8, 11, 88),
(43, 'Serhou Guirassy', 'Stuttgart', 'Bundesliga', 28, 28, 2, 89),
(44, 'Alex Grimaldo', 'Bayer Leverkusen', 'Bundesliga', 33, 10, 13, 91),
(45, 'Jeremie Frimpong', 'Bayer Leverkusen', 'Bundesliga', 31, 9, 7, 88),
(46, 'Lois Openda', 'RB Leipzig', 'Bundesliga', 33, 24, 7, 87),
(47, 'Joshua Kimmich', 'Bayern Munich', 'Bundesliga', 30, 1, 6, 89),
(48, 'Julian Brandt', 'Borussia Dortmund', 'Bundesliga', 32, 7, 11, 85),
(49, 'Denis Undav', 'Stuttgart', 'Bundesliga', 29, 18, 9, 84),
(50, 'Niclas Fullkrug', 'Borussia Dortmund', 'Bundesliga', 31, 12, 8, 82),
(51, 'Granit Xhaka', 'Bayer Leverkusen', 'Bundesliga', 33, 3, 0, 90),
(52, 'Thomas Muller', 'Bayern Munich', 'Bundesliga', 25, 5, 7, 84),
(53, 'Lautaro Martinez', 'Inter Milan', 'Serie A', 33, 24, 3, 92),
(54, 'Rafael Leao', 'AC Milan', 'Serie A', 32, 8, 9, 89),
(55, 'Khvicha Kvaratskhelia', 'Napoli', 'Serie A', 33, 11, 6, 88),
(56, 'Paulo Dybala', 'AS Roma', 'Serie A', 26, 13, 9, 87),
(57, 'Dusan Vlahovic', 'Juventus', 'Serie A', 31, 16, 4, 85),
(58, 'Hakan Calhanoglu', 'Inter Milan', 'Serie A', 30, 13, 3, 90),
(59, 'Marcus Thuram', 'Inter Milan', 'Serie A', 34, 13, 7, 86),
(60, 'Christian Pulisic', 'AC Milan', 'Serie A', 34, 12, 8, 87),
(61, 'Teun Koopmeiners', 'Atalanta', 'Serie A', 32, 12, 5, 86),
(62, 'Victor Osimhen', 'Napoli', 'Serie A', 24, 15, 3, 89),
(63, 'Federico Chiesa', 'Juventus', 'Serie A', 32, 9, 2, 84),
(64, 'Nicolo Barella', 'Inter Milan', 'Serie A', 35, 2, 3, 89),
(65, 'Adrien Rabiot', 'Juventus', 'Serie A', 30, 5, 3, 83),
(66, 'Romelu Lukaku', 'AS Roma', 'Serie A', 31, 13, 3, 82),
(67, 'Theo Hernandez', 'AC Milan', 'Serie A', 31, 5, 4, 88),
(68, 'Olivier Giroud', 'AC Milan', 'Serie A', 33, 14, 8, 81),
(69, 'Kylian Mbappe', 'PSG', 'Ligue 1', 29, 27, 7, 96),
(70, 'Ousmane Dembele', 'PSG', 'Ligue 1', 26, 3, 8, 88),
(71, 'Jonathan David', 'Lille', 'Ligue 1', 34, 19, 4, 85),
(72, 'Pierre-Emerick Aubameyang', 'Marseille', 'Ligue 1', 34, 17, 8, 86),
(73, 'Alexandre Lacazette', 'Lyon', 'Ligue 1', 29, 17, 3, 84),
(74, 'Vitinha', 'PSG', 'Ligue 1', 28, 7, 4, 89),
(75, 'Achraf Hakimi', 'PSG', 'Ligue 1', 25, 4, 5, 90),
(76, 'Bradley Barcola', 'PSG', 'Ligue 1', 25, 4, 7, 83),
(77, 'Edon Zhegrova', 'Lille', 'Ligue 1', 31, 6, 6, 82),
(78, 'Wissam Ben Yedder', 'Monaco', 'Ligue 1', 32, 16, 2, 81),
(79, 'Aleksandr Golovin', 'Monaco', 'Ligue 1', 25, 6, 6, 84),
(80, 'Min-jae Kim', 'PSG', 'Ligue 1', 28, 1, 0, 87),
(81, 'Takumi Minamino', 'Monaco', 'Ligue 1', 30, 9, 6, 82),
(82, 'Goncalo Ramos', 'PSG', 'Ligue 1', 28, 11, 1, 80),
(83, 'Warren Zaire-Emery', 'PSG', 'Ligue 1', 26, 2, 3, 85),
(84, 'Martin Terrier', 'Rennes', 'Ligue 1', 24, 7, 3, 81);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
