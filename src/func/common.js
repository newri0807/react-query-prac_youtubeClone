// eslint-disable-next-line import/no-anonymous-default-export
// 시간 계산 함수
export default function getRelativeTime(publishedAt) {
  const datePublished = new Date(publishedAt);
  const dateNow = new Date();
  const diff = dateNow - datePublished;
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  }

  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours} hours ago`;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 30) {
    return `${days} days ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} months ago`;
  }

  const years = Math.floor(months / 12);
  return `${years} years ago`;
}
