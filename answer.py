import numpy

class MovingTotal:

    def append(self, numbers):
        """
        :param numbers: (list) The list of numbers.
        """
        try:
            self.numbers = numpy.concatenate((self.numbers,numbers))
        except:
            self.numbers = numpy.array(numbers)
        pass

    def contains(self, total):
        """
        :param total: (int) The total to check for.
        :returns: (bool) If MovingTotal contains the total.
        """
        listOfTotals=[]
        for i in range(len(self.numbers)):
            if i > 1:
                listOfTotals.append(self.numbers[i] + self.numbers[i-1] + self.numbers[i-2])
        
        if total in listOfTotals:
            return True
        elif total not in listOfTotals:
            return False
    
if __name__ == "__main__":
    movingtotal = MovingTotal()
    
    movingtotal.append([1, 2, 3, 4])
    print(movingtotal.contains(6))
    print(movingtotal.contains(9))
    print(movingtotal.contains(12))
    print(movingtotal.contains(7))
    
    movingtotal.append([5])
    print(movingtotal.contains(6))
    print(movingtotal.contains(9))
    print(movingtotal.contains(12))
    print(movingtotal.contains(7))