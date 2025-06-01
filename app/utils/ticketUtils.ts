  export const priorityList = (priority: string) => { 
    switch (priority) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-orange-400';
      case 'Low':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  }