-- Создание региональных баз данных
-- Этот скрипт выполняется при первом запуске контейнера PostgreSQL

CREATE DATABASE vipgate_us_canada;
CREATE DATABASE vipgate_europe;
CREATE DATABASE vipgate_asia;
CREATE DATABASE vipgate_south_america;
CREATE DATABASE vipgate_middle_east;

-- Предоставление прав пользователю
GRANT ALL PRIVILEGES ON DATABASE vipgate_us_canada TO vipgate_user;
GRANT ALL PRIVILEGES ON DATABASE vipgate_europe TO vipgate_user;
GRANT ALL PRIVILEGES ON DATABASE vipgate_asia TO vipgate_user;
GRANT ALL PRIVILEGES ON DATABASE vipgate_south_america TO vipgate_user;
GRANT ALL PRIVILEGES ON DATABASE vipgate_middle_east TO vipgate_user;

