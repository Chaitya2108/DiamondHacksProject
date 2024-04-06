from thing import func

def test_good():
    assert func(0) == 1

def test_good_2():
    assert func(1) == 2

def test_bad():
    assert func(0) == 2

def test_bad_2():
    assert func(1) == 1
