def bubble_sort(arr):
    """
    冒泡排序算法实现
    :param arr: 需要排序的列表
    :return: 排序后的列表
    """
    n = len(arr)
    # 遍历所有数组元素
    for i in range(n):
        # Last i elements are already in place
        # 最后的i个元素已经排好序了，不需要再比较
        swapped = False
        for j in range(0, n - i - 1):
            # 遍历数组从0到n-i-1
            # 交换如果发现元素比下一个元素大
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # 如果内层循环没有发生交换，说明数组已经有序
        if not swapped:
            break
    return arr

if __name__ == "__main__":
    # 测试代码
    import random
    
    # 生成随机列表
    test_list = [random.randint(1, 100) for _ in range(10)]
    print(f"原始列表: {test_list}")
    
    # 排序
    sorted_list = bubble_sort(test_list.copy())
    print(f"排序后列表: {sorted_list}")
    
    # 验证排序结果
    assert sorted_list == sorted(test_list), "排序结果不正确!"
    print("验证通过: 列表已正确排序")
