// helper function

// 1776 -> "1,776"

export const formatWithCommas = (value : number) : string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
} 

export const  formatTimeAgo =  ( hoursAgo : number) :  string => {
  if (hoursAgo < 1){
    return 'Just now';
  }

  if (hoursAgo < 24 ){
    return `${hoursAgo}  hour${hoursAgo ===1 ? '' : 's'} ago`;
  }

  const days = Math.floor(hoursAgo/24);
  if ( days < 7){
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  const weeks = Math.floor(days/7);
  return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
}

export const formatTimeShort = (hoursAgo: number) : string => {
  if (hoursAgo < 1) return 'now';
  if (hoursAgo < 24) return `${hoursAgo}h`;
  const days = Math.floor(hoursAgo / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
}

export const formatCompact = (value: number):string => {
  // 1_000_000 means same as 1000000 same for other if statements 
  if (value >= 1_000_000){
      return `${oneDecimal(value / 1_000_000)} M`;
  } 

  if (value >= 100_000) {
    return `${Math.floor(value / 1_000)}K`;
  }

  if (value >= 10_000){
     return `${oneDecimal(value / 1_000)}K`;
  }
  return formatWithCommas(value);
}

const  oneDecimal = (value: number): string =>  {
  return (Math.floor(value * 10) / 10).toString();
}

