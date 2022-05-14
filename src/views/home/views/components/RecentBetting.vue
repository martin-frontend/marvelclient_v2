<template>
    <div>
        <div class="text-16 mb-2 ml-2 mr-4 d-flex">
            <div class="icon-box iconfont icon-bangdan icon__icon colorYellow--text text-22 mr-1"></div>
            <div class="text-title">近期投注</div>
        </div>
        <div class="RecentBetting-container">
            <div class="RecentBetting-header">
                <div><p class="RecentBetting-header-title">游戏名称</p></div>
                <div><p class="RecentBetting-header-title">玩家</p></div>
                <div><p class="RecentBetting-header-title">时间</p></div>
                <div><p class="RecentBetting-header-title">投注金额(USD)</p></div>
                <div><p class="RecentBetting-header-title">赔率</p></div>
                <div><p class="RecentBetting-header-title">盈利(USD)</p></div>
            </div>
            <div class="RecentBetting-content-container">
                <div class="RecentBetting-content-box">
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***666</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:26:58</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 571.00<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM/SURBVHgBxVdNTBNBFH4zWyqIweJFCCVZ5CIhsY1cRA+WeOAKB7gpafQOxhgjF8sFYrjAnaRBb3KwHo0HykHwIvZC8IJugvwYIyyEvyC743tLu1m6u+22tOVLNrs7O7Pve99782aGgUcE4kOBaqm6RwJ+H1/DeMnUnP6sghApYEzRQXw41A6TanRC9fJflq9DQ/xFxCdJgwIgYjGYD2Q8oWnayGb0tQLFECCPa6XaVwBiCM4BwSC2/nB0BAohgF7LkiTNwqnMpUAK1eh1UsNGoCk+HAYJyLhXub1CQRJd2STOEEh7/q0Mxl1J8MwDxTwte7mME2SJ87i1wSRwmnAli7k7GIs0vnlpJrYRgrT0P536P2m7i9c9KAZTy5/xmnf6pO5rBy1UK3z0hrLE3H5SV1UNwdriokJjXRC4zGuGsFjEOHmPsgxAhcEYG6Q7Fjkpkqvj6r4KC5v26LRfa4Q6/6mHu/+OYOnvhuPYHAgE32KVxRoeQTquvWZWFo0rG196n5sEyHjfpykoFJrgYQ6Mh+CCgMZDpICca0kiL9vrG2H3+MjWnt3H2kZh2Tk+hF97OcKAtn1o3DHFm6/Uw+ObnfBxdRkWfttzgAiZOYDPS9v2HCBS/aEOeLfy1ZkIYzIHF3Q3t0Fnww04D4hgd7AN+ls7HL8LIVTWND287aZC5/UW6Gu9bahBWNpaN7yl7G7Oqg2ZtiD2veqvwXvASM6ZH4uOCqYZJH20i8GnsNN3GmgdnIkzGaHqaM6CrQ2Y+j5v9F3FGUPxz84ZR/sgdigJ51CBMHiAGWc09OzWgzM54DRV8xJgLIkzAVJwQTjRTpK8SvMnUAtPG8hSAhNQ+RMdT3ElGlMxFpNQYWDpidHdmIZ+/dJEJVUg79cGxqZNApVWIeO9SYCwPjAWAyaSUG4IfTLjPcFn/aad6FHO+Syu1XK+/9x5Pw4FQ0BqXz+KWZtsyxBtULySKNz4QVf2kc22FtCWWdf1rpKGA2V3Mk7IeTZswt2rEDBYrBqU7Xg0e7rxaCzh1sfL4VTGE3GP4AUQwUWGAUvs6QfT+U7JeQlYQXs40KUQjooIJgKojmz8hIGChV1hGGehw9xadNRzef8P63ljL/ipIlsAAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">1.00x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 571.00<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM/SURBVHgBxVdNTBNBFH4zWyqIweJFCCVZ5CIhsY1cRA+WeOAKB7gpafQOxhgjF8sFYrjAnaRBb3KwHo0HykHwIvZC8IJugvwYIyyEvyC743tLu1m6u+22tOVLNrs7O7Pve99782aGgUcE4kOBaqm6RwJ+H1/DeMnUnP6sghApYEzRQXw41A6TanRC9fJflq9DQ/xFxCdJgwIgYjGYD2Q8oWnayGb0tQLFECCPa6XaVwBiCM4BwSC2/nB0BAohgF7LkiTNwqnMpUAK1eh1UsNGoCk+HAYJyLhXub1CQRJd2STOEEh7/q0Mxl1J8MwDxTwte7mME2SJ87i1wSRwmnAli7k7GIs0vnlpJrYRgrT0P536P2m7i9c9KAZTy5/xmnf6pO5rBy1UK3z0hrLE3H5SV1UNwdriokJjXRC4zGuGsFjEOHmPsgxAhcEYG6Q7Fjkpkqvj6r4KC5v26LRfa4Q6/6mHu/+OYOnvhuPYHAgE32KVxRoeQTquvWZWFo0rG196n5sEyHjfpykoFJrgYQ6Mh+CCgMZDpICca0kiL9vrG2H3+MjWnt3H2kZh2Tk+hF97OcKAtn1o3DHFm6/Uw+ObnfBxdRkWfttzgAiZOYDPS9v2HCBS/aEOeLfy1ZkIYzIHF3Q3t0Fnww04D4hgd7AN+ls7HL8LIVTWND287aZC5/UW6Gu9bahBWNpaN7yl7G7Oqg2ZtiD2veqvwXvASM6ZH4uOCqYZJH20i8GnsNN3GmgdnIkzGaHqaM6CrQ2Y+j5v9F3FGUPxz84ZR/sgdigJ51CBMHiAGWc09OzWgzM54DRV8xJgLIkzAVJwQTjRTpK8SvMnUAtPG8hSAhNQ+RMdT3ElGlMxFpNQYWDpidHdmIZ+/dJEJVUg79cGxqZNApVWIeO9SYCwPjAWAyaSUG4IfTLjPcFn/aad6FHO+Syu1XK+/9x5Pw4FQ0BqXz+KWZtsyxBtULySKNz4QVf2kc22FtCWWdf1rpKGA2V3Mk7IeTZswt2rEDBYrBqU7Xg0e7rxaCzh1sfL4VTGE3GP4AUQwUWGAUvs6QfT+U7JeQlYQXs40KUQjooIJgKojmz8hIGChV1hGGehw9xadNRzef8P63ljL/ipIlsAAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">普通百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***eng</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:26:57</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 428.57<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM/SURBVHgBxVdNTBNBFH4zWyqIweJFCCVZ5CIhsY1cRA+WeOAKB7gpafQOxhgjF8sFYrjAnaRBb3KwHo0HykHwIvZC8IJugvwYIyyEvyC743tLu1m6u+22tOVLNrs7O7Pve99782aGgUcE4kOBaqm6RwJ+H1/DeMnUnP6sghApYEzRQXw41A6TanRC9fJflq9DQ/xFxCdJgwIgYjGYD2Q8oWnayGb0tQLFECCPa6XaVwBiCM4BwSC2/nB0BAohgF7LkiTNwqnMpUAK1eh1UsNGoCk+HAYJyLhXub1CQRJd2STOEEh7/q0Mxl1J8MwDxTwte7mME2SJ87i1wSRwmnAli7k7GIs0vnlpJrYRgrT0P536P2m7i9c9KAZTy5/xmnf6pO5rBy1UK3z0hrLE3H5SV1UNwdriokJjXRC4zGuGsFjEOHmPsgxAhcEYG6Q7Fjkpkqvj6r4KC5v26LRfa4Q6/6mHu/+OYOnvhuPYHAgE32KVxRoeQTquvWZWFo0rG196n5sEyHjfpykoFJrgYQ6Mh+CCgMZDpICca0kiL9vrG2H3+MjWnt3H2kZh2Tk+hF97OcKAtn1o3DHFm6/Uw+ObnfBxdRkWfttzgAiZOYDPS9v2HCBS/aEOeLfy1ZkIYzIHF3Q3t0Fnww04D4hgd7AN+ls7HL8LIVTWND287aZC5/UW6Gu9bahBWNpaN7yl7G7Oqg2ZtiD2veqvwXvASM6ZH4uOCqYZJH20i8GnsNN3GmgdnIkzGaHqaM6CrQ2Y+j5v9F3FGUPxz84ZR/sgdigJ51CBMHiAGWc09OzWgzM54DRV8xJgLIkzAVJwQTjRTpK8SvMnUAtPG8hSAhNQ+RMdT3ElGlMxFpNQYWDpidHdmIZ+/dJEJVUg79cGxqZNApVWIeO9SYCwPjAWAyaSUG4IfTLjPcFn/aad6FHO+Syu1XK+/9x5Pw4FQ0BqXz+KWZtsyxBtULySKNz4QVf2kc22FtCWWdf1rpKGA2V3Mk7IeTZswt2rEDBYrBqU7Xg0e7rxaCzh1sfL4VTGE3GP4AUQwUWGAUvs6QfT+U7JeQlYQXs40KUQjooIJgKojmz8hIGChV1hGGehw9xadNRzef8P63ljL/ipIlsAAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">0.95x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 407.14<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM/SURBVHgBxVdNTBNBFH4zWyqIweJFCCVZ5CIhsY1cRA+WeOAKB7gpafQOxhgjF8sFYrjAnaRBb3KwHo0HykHwIvZC8IJugvwYIyyEvyC743tLu1m6u+22tOVLNrs7O7Pve99782aGgUcE4kOBaqm6RwJ+H1/DeMnUnP6sghApYEzRQXw41A6TanRC9fJflq9DQ/xFxCdJgwIgYjGYD2Q8oWnayGb0tQLFECCPa6XaVwBiCM4BwSC2/nB0BAohgF7LkiTNwqnMpUAK1eh1UsNGoCk+HAYJyLhXub1CQRJd2STOEEh7/q0Mxl1J8MwDxTwte7mME2SJ87i1wSRwmnAli7k7GIs0vnlpJrYRgrT0P536P2m7i9c9KAZTy5/xmnf6pO5rBy1UK3z0hrLE3H5SV1UNwdriokJjXRC4zGuGsFjEOHmPsgxAhcEYG6Q7Fjkpkqvj6r4KC5v26LRfa4Q6/6mHu/+OYOnvhuPYHAgE32KVxRoeQTquvWZWFo0rG196n5sEyHjfpykoFJrgYQ6Mh+CCgMZDpICca0kiL9vrG2H3+MjWnt3H2kZh2Tk+hF97OcKAtn1o3DHFm6/Uw+ObnfBxdRkWfttzgAiZOYDPS9v2HCBS/aEOeLfy1ZkIYzIHF3Q3t0Fnww04D4hgd7AN+ls7HL8LIVTWND287aZC5/UW6Gu9bahBWNpaN7yl7G7Oqg2ZtiD2veqvwXvASM6ZH4uOCqYZJH20i8GnsNN3GmgdnIkzGaHqaM6CrQ2Y+j5v9F3FGUPxz84ZR/sgdigJ51CBMHiAGWc09OzWgzM54DRV8xJgLIkzAVJwQTjRTpK8SvMnUAtPG8hSAhNQ+RMdT3ElGlMxFpNQYWDpidHdmIZ+/dJEJVUg79cGxqZNApVWIeO9SYCwPjAWAyaSUG4IfTLjPcFn/aad6FHO+Syu1XK+/9x5Pw4FQ0BqXz+KWZtsyxBtULySKNz4QVf2kc22FtCWWdf1rpKGA2V3Mk7IeTZswt2rEDBYrBqU7Xg0e7rxaCzh1sfL4VTGE3GP4AUQwUWGAUvs6QfT+U7JeQlYQXs40KUQjooIJgKojmz8hIGChV1hGGehw9xadNRzef8P63ljL/ipIlsAAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***iao</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:26:45</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 614.29<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANvSURBVHgBrVdBTBNBFP0zS4tAiSWRyI018eJJEi/GCJRbb1bUYAyJbUjwZMQjcqA9EI7W4EUTQomGYCSIJ+uJCh44aKwnLibWkySQUA1F3GV3nD/tllpa9q/4kk2m3Zl57/9583eGARGh6HbQMiACTOtlILqAMR0EBNVLBnkQIieAZRnwDPeZrzOptjxlXkYg1m2TxyXhlTIhAQIgZfqsxFqqLQf/IgAjtk1tXDZH4DgQLL4y15oALwKKUWvLsqnD/0HO8Fl9tbLBq/+4FN3uopIHmpl6CND9cs6LMrAjBWDkDab2CoiR3wj74XrYB0TUFMEryINe0t5xikO03w+x/kbZJmWhLAK5DgkoGU4HImKS3MHonSbwAL3EdSAgVEwL2e3hbh+Eew5S33VOg8sXGsADRpylUALUPvcATHs17g42Ug2p4De4CpiV1n6bOhDJoxXpr8TM4m9ILRpARJ77rDPcMrQIdYRjvHrAXeHBkEHk5oyJEHVE7AhyBC6BF0PiN0V6gJ+ndK42Xj2gIfEhKuiVAoRO6VvLePUwOnyCaEgWxF3g+oVTxaad7vCOdk6tkDqn9DpNN1YZgWbS1KoOuB4c0qsmDD0owMamcOsKX77ZcG9iV44hbce8FMBylJ6xa41y4gJMPdurKWSnIGDq+R6MPfyllgx/u0H2yHKw7c9uHbPrFnzftOFFMgCtLVxF+GbFLL/H9tBYAVpl2qcnmuHT+j5sbLkLkMix7ls/o4zBDKX39EQLnO3kMgO2rHqGTLcFgZaiP0aHm5RR8d3A/QJlOhAaRJxS/BUIuwErIUbokKZl5Oj4yn0/MLJDjR5kKW7j6vQqxCxlwMaWreq9AyxMleToASo5HlqRW+0VbttJIGLhrak8UY3VD/uwkDap04BpWeqgqgRk5uVhkYlH1MGTT/b+cjmu+2MZPRlCJNbmiwfUcrXgDXYcLxeU8bgUk08PCNGQ1NQjx8rcyXiZ12mo9bDtPqqI9x/34WXaUFsQCxWV3ECOChyqsaGb8k7A+bK6ermgeCwHWvQlcif1dQV4FUGCEFlJfrWavK4ABz2DP6Qv2DgcB0wk+I6dzCzVvqy6X04xGxoeWtltIEPI2gKzMupkrag9CSgLicjreQBCTPCIvIZ3qiu6PFCUCHOAX1UB7wTYWW0XlupFXI0/qyaAeYGIRS4AAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">0.95x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 583.57<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANvSURBVHgBrVdBTBNBFP0zS4tAiSWRyI018eJJEi/GCJRbb1bUYAyJbUjwZMQjcqA9EI7W4EUTQomGYCSIJ+uJCh44aKwnLibWkySQUA1F3GV3nD/tllpa9q/4kk2m3Zl57/9583eGARGh6HbQMiACTOtlILqAMR0EBNVLBnkQIieAZRnwDPeZrzOptjxlXkYg1m2TxyXhlTIhAQIgZfqsxFqqLQf/IgAjtk1tXDZH4DgQLL4y15oALwKKUWvLsqnD/0HO8Fl9tbLBq/+4FN3uopIHmpl6CND9cs6LMrAjBWDkDab2CoiR3wj74XrYB0TUFMEryINe0t5xikO03w+x/kbZJmWhLAK5DgkoGU4HImKS3MHonSbwAL3EdSAgVEwL2e3hbh+Eew5S33VOg8sXGsADRpylUALUPvcATHs17g42Ug2p4De4CpiV1n6bOhDJoxXpr8TM4m9ILRpARJ77rDPcMrQIdYRjvHrAXeHBkEHk5oyJEHVE7AhyBC6BF0PiN0V6gJ+ndK42Xj2gIfEhKuiVAoRO6VvLePUwOnyCaEgWxF3g+oVTxaad7vCOdk6tkDqn9DpNN1YZgWbS1KoOuB4c0qsmDD0owMamcOsKX77ZcG9iV44hbce8FMBylJ6xa41y4gJMPdurKWSnIGDq+R6MPfyllgx/u0H2yHKw7c9uHbPrFnzftOFFMgCtLVxF+GbFLL/H9tBYAVpl2qcnmuHT+j5sbLkLkMix7ls/o4zBDKX39EQLnO3kMgO2rHqGTLcFgZaiP0aHm5RR8d3A/QJlOhAaRJxS/BUIuwErIUbokKZl5Oj4yn0/MLJDjR5kKW7j6vQqxCxlwMaWreq9AyxMleToASo5HlqRW+0VbttJIGLhrak8UY3VD/uwkDap04BpWeqgqgRk5uVhkYlH1MGTT/b+cjmu+2MZPRlCJNbmiwfUcrXgDXYcLxeU8bgUk08PCNGQ1NQjx8rcyXiZ12mo9bDtPqqI9x/34WXaUFsQCxWV3ECOChyqsaGb8k7A+bK6ermgeCwHWvQlcif1dQV4FUGCEFlJfrWavK4ABz2DP6Qv2DgcB0wk+I6dzCzVvqy6X04xGxoeWtltIEPI2gKzMupkrag9CSgLicjreQBCTPCIvIZ3qiu6PFCUCHOAX1UB7wTYWW0XlupFXI0/qyaAeYGIRS4AAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">普通百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***588</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:26:39</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 300.00<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANvSURBVHgBrVdBTBNBFP0zS4tAiSWRyI018eJJEi/GCJRbb1bUYAyJbUjwZMQjcqA9EI7W4EUTQomGYCSIJ+uJCh44aKwnLibWkySQUA1F3GV3nD/tllpa9q/4kk2m3Zl57/9583eGARGh6HbQMiACTOtlILqAMR0EBNVLBnkQIieAZRnwDPeZrzOptjxlXkYg1m2TxyXhlTIhAQIgZfqsxFqqLQf/IgAjtk1tXDZH4DgQLL4y15oALwKKUWvLsqnD/0HO8Fl9tbLBq/+4FN3uopIHmpl6CND9cs6LMrAjBWDkDab2CoiR3wj74XrYB0TUFMEryINe0t5xikO03w+x/kbZJmWhLAK5DgkoGU4HImKS3MHonSbwAL3EdSAgVEwL2e3hbh+Eew5S33VOg8sXGsADRpylUALUPvcATHs17g42Ug2p4De4CpiV1n6bOhDJoxXpr8TM4m9ILRpARJ77rDPcMrQIdYRjvHrAXeHBkEHk5oyJEHVE7AhyBC6BF0PiN0V6gJ+ndK42Xj2gIfEhKuiVAoRO6VvLePUwOnyCaEgWxF3g+oVTxaad7vCOdk6tkDqn9DpNN1YZgWbS1KoOuB4c0qsmDD0owMamcOsKX77ZcG9iV44hbce8FMBylJ6xa41y4gJMPdurKWSnIGDq+R6MPfyllgx/u0H2yHKw7c9uHbPrFnzftOFFMgCtLVxF+GbFLL/H9tBYAVpl2qcnmuHT+j5sbLkLkMix7ls/o4zBDKX39EQLnO3kMgO2rHqGTLcFgZaiP0aHm5RR8d3A/QJlOhAaRJxS/BUIuwErIUbokKZl5Oj4yn0/MLJDjR5kKW7j6vQqxCxlwMaWreq9AyxMleToASo5HlqRW+0VbttJIGLhrak8UY3VD/uwkDap04BpWeqgqgRk5uVhkYlH1MGTT/b+cjmu+2MZPRlCJNbmiwfUcrXgDXYcLxeU8bgUk08PCNGQ1NQjx8rcyXiZ12mo9bDtPqqI9x/34WXaUFsQCxWV3ECOChyqsaGb8k7A+bK6ermgeCwHWvQlcif1dQV4FUGCEFlJfrWavK4ABz2DP6Qv2DgcB0wk+I6dzCzVvqy6X04xGxoeWtltIEPI2gKzMupkrag9CSgLicjreQBCTPCIvIZ3qiu6PFCUCHOAX1UB7wTYWW0XlupFXI0/qyaAeYGIRS4AAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">0.95x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 285.00<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANvSURBVHgBrVdBTBNBFP0zS4tAiSWRyI018eJJEi/GCJRbb1bUYAyJbUjwZMQjcqA9EI7W4EUTQomGYCSIJ+uJCh44aKwnLibWkySQUA1F3GV3nD/tllpa9q/4kk2m3Zl57/9583eGARGh6HbQMiACTOtlILqAMR0EBNVLBnkQIieAZRnwDPeZrzOptjxlXkYg1m2TxyXhlTIhAQIgZfqsxFqqLQf/IgAjtk1tXDZH4DgQLL4y15oALwKKUWvLsqnD/0HO8Fl9tbLBq/+4FN3uopIHmpl6CND9cs6LMrAjBWDkDab2CoiR3wj74XrYB0TUFMEryINe0t5xikO03w+x/kbZJmWhLAK5DgkoGU4HImKS3MHonSbwAL3EdSAgVEwL2e3hbh+Eew5S33VOg8sXGsADRpylUALUPvcATHs17g42Ug2p4De4CpiV1n6bOhDJoxXpr8TM4m9ILRpARJ77rDPcMrQIdYRjvHrAXeHBkEHk5oyJEHVE7AhyBC6BF0PiN0V6gJ+ndK42Xj2gIfEhKuiVAoRO6VvLePUwOnyCaEgWxF3g+oVTxaad7vCOdk6tkDqn9DpNN1YZgWbS1KoOuB4c0qsmDD0owMamcOsKX77ZcG9iV44hbce8FMBylJ6xa41y4gJMPdurKWSnIGDq+R6MPfyllgx/u0H2yHKw7c9uHbPrFnzftOFFMgCtLVxF+GbFLL/H9tBYAVpl2qcnmuHT+j5sbLkLkMix7ls/o4zBDKX39EQLnO3kMgO2rHqGTLcFgZaiP0aHm5RR8d3A/QJlOhAaRJxS/BUIuwErIUbokKZl5Oj4yn0/MLJDjR5kKW7j6vQqxCxlwMaWreq9AyxMleToASo5HlqRW+0VbttJIGLhrak8UY3VD/uwkDap04BpWeqgqgRk5uVhkYlH1MGTT/b+cjmu+2MZPRlCJNbmiwfUcrXgDXYcLxeU8bgUk08PCNGQ1NQjx8rcyXiZ12mo9bDtPqqI9x/34WXaUFsQCxWV3ECOChyqsaGb8k7A+bK6ermgeCwHWvQlcif1dQV4FUGCEFlJfrWavK4ABz2DP6Qv2DgcB0wk+I6dzCzVvqy6X04xGxoeWtltIEPI2gKzMupkrag9CSgLicjreQBCTPCIvIZ3qiu6PFCUCHOAX1UB7wTYWW0XlupFXI0/qyaAeYGIRS4AAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">包桌百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***123</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:26:25</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 302.86<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM/SURBVHgBxVdNTBNBFH4zWyqIweJFCCVZ5CIhsY1cRA+WeOAKB7gpafQOxhgjF8sFYrjAnaRBb3KwHo0HykHwIvZC8IJugvwYIyyEvyC743tLu1m6u+22tOVLNrs7O7Pve99782aGgUcE4kOBaqm6RwJ+H1/DeMnUnP6sghApYEzRQXw41A6TanRC9fJflq9DQ/xFxCdJgwIgYjGYD2Q8oWnayGb0tQLFECCPa6XaVwBiCM4BwSC2/nB0BAohgF7LkiTNwqnMpUAK1eh1UsNGoCk+HAYJyLhXub1CQRJd2STOEEh7/q0Mxl1J8MwDxTwte7mME2SJ87i1wSRwmnAli7k7GIs0vnlpJrYRgrT0P536P2m7i9c9KAZTy5/xmnf6pO5rBy1UK3z0hrLE3H5SV1UNwdriokJjXRC4zGuGsFjEOHmPsgxAhcEYG6Q7Fjkpkqvj6r4KC5v26LRfa4Q6/6mHu/+OYOnvhuPYHAgE32KVxRoeQTquvWZWFo0rG196n5sEyHjfpykoFJrgYQ6Mh+CCgMZDpICca0kiL9vrG2H3+MjWnt3H2kZh2Tk+hF97OcKAtn1o3DHFm6/Uw+ObnfBxdRkWfttzgAiZOYDPS9v2HCBS/aEOeLfy1ZkIYzIHF3Q3t0Fnww04D4hgd7AN+ls7HL8LIVTWND287aZC5/UW6Gu9bahBWNpaN7yl7G7Oqg2ZtiD2veqvwXvASM6ZH4uOCqYZJH20i8GnsNN3GmgdnIkzGaHqaM6CrQ2Y+j5v9F3FGUPxz84ZR/sgdigJ51CBMHiAGWc09OzWgzM54DRV8xJgLIkzAVJwQTjRTpK8SvMnUAtPG8hSAhNQ+RMdT3ElGlMxFpNQYWDpidHdmIZ+/dJEJVUg79cGxqZNApVWIeO9SYCwPjAWAyaSUG4IfTLjPcFn/aad6FHO+Syu1XK+/9x5Pw4FQ0BqXz+KWZtsyxBtULySKNz4QVf2kc22FtCWWdf1rpKGA2V3Mk7IeTZswt2rEDBYrBqU7Xg0e7rxaCzh1sfL4VTGE3GP4AUQwUWGAUvs6QfT+U7JeQlYQXs40KUQjooIJgKojmz8hIGChV1hGGehw9xadNRzef8P63ljL/ipIlsAAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">1.00x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 302.86<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM/SURBVHgBxVdNTBNBFH4zWyqIweJFCCVZ5CIhsY1cRA+WeOAKB7gpafQOxhgjF8sFYrjAnaRBb3KwHo0HykHwIvZC8IJugvwYIyyEvyC743tLu1m6u+22tOVLNrs7O7Pve99782aGgUcE4kOBaqm6RwJ+H1/DeMnUnP6sghApYEzRQXw41A6TanRC9fJflq9DQ/xFxCdJgwIgYjGYD2Q8oWnayGb0tQLFECCPa6XaVwBiCM4BwSC2/nB0BAohgF7LkiTNwqnMpUAK1eh1UsNGoCk+HAYJyLhXub1CQRJd2STOEEh7/q0Mxl1J8MwDxTwte7mME2SJ87i1wSRwmnAli7k7GIs0vnlpJrYRgrT0P536P2m7i9c9KAZTy5/xmnf6pO5rBy1UK3z0hrLE3H5SV1UNwdriokJjXRC4zGuGsFjEOHmPsgxAhcEYG6Q7Fjkpkqvj6r4KC5v26LRfa4Q6/6mHu/+OYOnvhuPYHAgE32KVxRoeQTquvWZWFo0rG196n5sEyHjfpykoFJrgYQ6Mh+CCgMZDpICca0kiL9vrG2H3+MjWnt3H2kZh2Tk+hF97OcKAtn1o3DHFm6/Uw+ObnfBxdRkWfttzgAiZOYDPS9v2HCBS/aEOeLfy1ZkIYzIHF3Q3t0Fnww04D4hgd7AN+ls7HL8LIVTWND287aZC5/UW6Gu9bahBWNpaN7yl7G7Oqg2ZtiD2veqvwXvASM6ZH4uOCqYZJH20i8GnsNN3GmgdnIkzGaHqaM6CrQ2Y+j5v9F3FGUPxz84ZR/sgdigJ51CBMHiAGWc09OzWgzM54DRV8xJgLIkzAVJwQTjRTpK8SvMnUAtPG8hSAhNQ+RMdT3ElGlMxFpNQYWDpidHdmIZ+/dJEJVUg79cGxqZNApVWIeO9SYCwPjAWAyaSUG4IfTLjPcFn/aad6FHO+Syu1XK+/9x5Pw4FQ0BqXz+KWZtsyxBtULySKNz4QVf2kc22FtCWWdf1rpKGA2V3Mk7IeTZswt2rEDBYrBqU7Xg0e7rxaCzh1sfL4VTGE3GP4AUQwUWGAUvs6QfT+U7JeQlYQXs40KUQjooIJgKojmz8hIGChV1hGGehw9xadNRzef8P63ljL/ipIlsAAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***a87</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:26:09</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 512.00<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANvSURBVHgBrVdBTBNBFP0zS4tAiSWRyI018eJJEi/GCJRbb1bUYAyJbUjwZMQjcqA9EI7W4EUTQomGYCSIJ+uJCh44aKwnLibWkySQUA1F3GV3nD/tllpa9q/4kk2m3Zl57/9583eGARGh6HbQMiACTOtlILqAMR0EBNVLBnkQIieAZRnwDPeZrzOptjxlXkYg1m2TxyXhlTIhAQIgZfqsxFqqLQf/IgAjtk1tXDZH4DgQLL4y15oALwKKUWvLsqnD/0HO8Fl9tbLBq/+4FN3uopIHmpl6CND9cs6LMrAjBWDkDab2CoiR3wj74XrYB0TUFMEryINe0t5xikO03w+x/kbZJmWhLAK5DgkoGU4HImKS3MHonSbwAL3EdSAgVEwL2e3hbh+Eew5S33VOg8sXGsADRpylUALUPvcATHs17g42Ug2p4De4CpiV1n6bOhDJoxXpr8TM4m9ILRpARJ77rDPcMrQIdYRjvHrAXeHBkEHk5oyJEHVE7AhyBC6BF0PiN0V6gJ+ndK42Xj2gIfEhKuiVAoRO6VvLePUwOnyCaEgWxF3g+oVTxaad7vCOdk6tkDqn9DpNN1YZgWbS1KoOuB4c0qsmDD0owMamcOsKX77ZcG9iV44hbce8FMBylJ6xa41y4gJMPdurKWSnIGDq+R6MPfyllgx/u0H2yHKw7c9uHbPrFnzftOFFMgCtLVxF+GbFLL/H9tBYAVpl2qcnmuHT+j5sbLkLkMix7ls/o4zBDKX39EQLnO3kMgO2rHqGTLcFgZaiP0aHm5RR8d3A/QJlOhAaRJxS/BUIuwErIUbokKZl5Oj4yn0/MLJDjR5kKW7j6vQqxCxlwMaWreq9AyxMleToASo5HlqRW+0VbttJIGLhrak8UY3VD/uwkDap04BpWeqgqgRk5uVhkYlH1MGTT/b+cjmu+2MZPRlCJNbmiwfUcrXgDXYcLxeU8bgUk08PCNGQ1NQjx8rcyXiZ12mo9bDtPqqI9x/34WXaUFsQCxWV3ECOChyqsaGb8k7A+bK6ermgeCwHWvQlcif1dQV4FUGCEFlJfrWavK4ABz2DP6Qv2DgcB0wk+I6dzCzVvqy6X04xGxoeWtltIEPI2gKzMupkrag9CSgLicjreQBCTPCIvIZ3qiu6PFCUCHOAX1UB7wTYWW0XlupFXI0/qyaAeYGIRS4AAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">0.95x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 486.40<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANvSURBVHgBrVdBTBNBFP0zS4tAiSWRyI018eJJEi/GCJRbb1bUYAyJbUjwZMQjcqA9EI7W4EUTQomGYCSIJ+uJCh44aKwnLibWkySQUA1F3GV3nD/tllpa9q/4kk2m3Zl57/9583eGARGh6HbQMiACTOtlILqAMR0EBNVLBnkQIieAZRnwDPeZrzOptjxlXkYg1m2TxyXhlTIhAQIgZfqsxFqqLQf/IgAjtk1tXDZH4DgQLL4y15oALwKKUWvLsqnD/0HO8Fl9tbLBq/+4FN3uopIHmpl6CND9cs6LMrAjBWDkDab2CoiR3wj74XrYB0TUFMEryINe0t5xikO03w+x/kbZJmWhLAK5DgkoGU4HImKS3MHonSbwAL3EdSAgVEwL2e3hbh+Eew5S33VOg8sXGsADRpylUALUPvcATHs17g42Ug2p4De4CpiV1n6bOhDJoxXpr8TM4m9ILRpARJ77rDPcMrQIdYRjvHrAXeHBkEHk5oyJEHVE7AhyBC6BF0PiN0V6gJ+ndK42Xj2gIfEhKuiVAoRO6VvLePUwOnyCaEgWxF3g+oVTxaad7vCOdk6tkDqn9DpNN1YZgWbS1KoOuB4c0qsmDD0owMamcOsKX77ZcG9iV44hbce8FMBylJ6xa41y4gJMPdurKWSnIGDq+R6MPfyllgx/u0H2yHKw7c9uHbPrFnzftOFFMgCtLVxF+GbFLL/H9tBYAVpl2qcnmuHT+j5sbLkLkMix7ls/o4zBDKX39EQLnO3kMgO2rHqGTLcFgZaiP0aHm5RR8d3A/QJlOhAaRJxS/BUIuwErIUbokKZl5Oj4yn0/MLJDjR5kKW7j6vQqxCxlwMaWreq9AyxMleToASo5HlqRW+0VbttJIGLhrak8UY3VD/uwkDap04BpWeqgqgRk5uVhkYlH1MGTT/b+cjmu+2MZPRlCJNbmiwfUcrXgDXYcLxeU8bgUk08PCNGQ1NQjx8rcyXiZ12mo9bDtPqqI9x/34WXaUFsQCxWV3ECOChyqsaGb8k7A+bK6ermgeCwHWvQlcif1dQV4FUGCEFlJfrWavK4ABz2DP6Qv2DgcB0wk+I6dzCzVvqy6X04xGxoeWtltIEPI2gKzMupkrag9CSgLicjreQBCTPCIvIZ3qiu6PFCUCHOAX1UB7wTYWW0XlupFXI0/qyaAeYGIRS4AAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">普通百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***588</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:28:37</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 360.00<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQhSURBVHgBrVfPbxNXEJ55u7aTtE1diUNoguTkVNRKyamllao6EmrT9gI9oJ4qVLWnNoW0f0CcP4CawBEJCCdAIMEFAUJKEAd+nHxB4UQsBRIOSIQEEhyv32NmvF42znrfLvBJjl/kt2+++ebHm0VICFPO519C175MRn1nDIxogAIC5OU3gBUEUwHEqq6byz2wMYcTKytJzkXbhrVyXzHjqkNksNgyaCXLhBAuQV1PdU88qcLbEGCPa84HkwbNYXg3lLrHl6YgDYGNcl8BXDVLywK8B5CRivH0/ig1thF4Ue4fUa6ZTSp3ClTB06PtJFT4H/Y8qXHM9UJKiKqibhQBjjlvSOq58+W/kPvtDmT2ltOQIRJ4KpIAJxxYYo4fDbwhMPQjYO8uUINjYGqr9NsuyO6/AM5nByyEsLh+bGeQ2C7/YVmSZHv2l4sklQG9dDsgox/fbnrS/7V8cMfnUHtwPvYchThJip/mXiEKaBdLYIGig9koe81eBv6Qt2zYGRrbQigO1Cfy66pHHEa/5BZsD7HEYmj3AfnuhAZ57909AmbtUfx51Ky6xpc+wRfH+g86aE5BUpDHXX/Oy9KsLgJsrorsYXBOeLcmhUwcPNCjLqIuJujIAcLe64WrUL9VCtRRFAZn6AcJC1eHWVuMDYljcEQh4DCkgDM4FqwbD6/JNxtib+tXfofazJ5Afg5XHFDhMCdhAVJADXzTNLoa7Z2QmT/XNNAWmm176VZVaVqulJlfflwNuV+vQ+bbqW1JqfqbJIFyIQ5s24UUUBTfLQeQhw5/hv+QxGNFWmXJaMzHJyFf225zmEjYfkOeblK8HfK01XzYsBMi6N07Yq0CGmJWWIEqfUbAAs503PGFrNlTTQmo/SRsVYH71X8SIv30PhH433Yk5QA+d0HjTVAmkgB3vyzFmQ1KzftoPLy69SCpgkX55vug1TVtzYienHM1QsXp8DP6kktMQ/Kz3JEGLEnXDrfhzeGzciGfczcXovJAWi/1fS698E0Y8CepWR1WhBXK7D0qz/C6dmZPvHVjqt3/LA9KC9yY/rREF/Nkp72c/dmfTgZGgfMh5sqt35iwJqCD+mD27yczzXlA69NcDR03h7rfJh1eO7E7Mr5civUEdwB7z8Z5KX2A5zRSYbqTCg3q+ZD7GFTvgCggFeGHpHb2e/rzvHmuNel8h5QptdZbbqGN4ztneWKxPC91n/35pPRSa6zbYMBM94wvH44mwLOBg7P0hlOABOA8MCkyn8fznLc+Gn5r2nYPpyXxLsYZqn2jzO0NM8pNAt4TNJiZKOM+sc54RdMrVceht1aDsp2u24nc+PKlTluso5BMzBnchzo5EXkVA7jc5a0ftb0lJ5/FmMzxvmJzgsIiZXOeUrrgn0KeYtUYU/GUuvnhX48rSc98DR2mtaEoWxGaAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">0.95x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 342.00<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQhSURBVHgBrVfPbxNXEJ55u7aTtE1diUNoguTkVNRKyamllao6EmrT9gI9oJ4qVLWnNoW0f0CcP4CawBEJCCdAIMEFAUJKEAd+nHxB4UQsBRIOSIQEEhyv32NmvF42znrfLvBJjl/kt2+++ebHm0VICFPO519C175MRn1nDIxogAIC5OU3gBUEUwHEqq6byz2wMYcTKytJzkXbhrVyXzHjqkNksNgyaCXLhBAuQV1PdU88qcLbEGCPa84HkwbNYXg3lLrHl6YgDYGNcl8BXDVLywK8B5CRivH0/ig1thF4Ue4fUa6ZTSp3ClTB06PtJFT4H/Y8qXHM9UJKiKqibhQBjjlvSOq58+W/kPvtDmT2ltOQIRJ4KpIAJxxYYo4fDbwhMPQjYO8uUINjYGqr9NsuyO6/AM5nByyEsLh+bGeQ2C7/YVmSZHv2l4sklQG9dDsgox/fbnrS/7V8cMfnUHtwPvYchThJip/mXiEKaBdLYIGig9koe81eBv6Qt2zYGRrbQigO1Cfy66pHHEa/5BZsD7HEYmj3AfnuhAZ57909AmbtUfx51Ky6xpc+wRfH+g86aE5BUpDHXX/Oy9KsLgJsrorsYXBOeLcmhUwcPNCjLqIuJujIAcLe64WrUL9VCtRRFAZn6AcJC1eHWVuMDYljcEQh4DCkgDM4FqwbD6/JNxtib+tXfofazJ5Afg5XHFDhMCdhAVJADXzTNLoa7Z2QmT/XNNAWmm176VZVaVqulJlfflwNuV+vQ+bbqW1JqfqbJIFyIQ5s24UUUBTfLQeQhw5/hv+QxGNFWmXJaMzHJyFf225zmEjYfkOeblK8HfK01XzYsBMi6N07Yq0CGmJWWIEqfUbAAs503PGFrNlTTQmo/SRsVYH71X8SIv30PhH433Yk5QA+d0HjTVAmkgB3vyzFmQ1KzftoPLy69SCpgkX55vug1TVtzYienHM1QsXp8DP6kktMQ/Kz3JEGLEnXDrfhzeGzciGfczcXovJAWi/1fS698E0Y8CepWR1WhBXK7D0qz/C6dmZPvHVjqt3/LA9KC9yY/rREF/Nkp72c/dmfTgZGgfMh5sqt35iwJqCD+mD27yczzXlA69NcDR03h7rfJh1eO7E7Mr5civUEdwB7z8Z5KX2A5zRSYbqTCg3q+ZD7GFTvgCggFeGHpHb2e/rzvHmuNel8h5QptdZbbqGN4ztneWKxPC91n/35pPRSa6zbYMBM94wvH44mwLOBg7P0hlOABOA8MCkyn8fznLc+Gn5r2nYPpyXxLsYZqn2jzO0NM8pNAt4TNJiZKOM+sc54RdMrVceht1aDsp2u24nc+PKlTluso5BMzBnchzo5EXkVA7jc5a0ftb0lJ5/FmMzxvmJzgsIiZXOeUrrgn0KeYtUYU/GUuvnhX48rSc98DR2mtaEoWxGaAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">包桌百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***123</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:28:31</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 428.57<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM/SURBVHgBxVdNTBNBFH4zWyqIweJFCCVZ5CIhsY1cRA+WeOAKB7gpafQOxhgjF8sFYrjAnaRBb3KwHo0HykHwIvZC8IJugvwYIyyEvyC743tLu1m6u+22tOVLNrs7O7Pve99782aGgUcE4kOBaqm6RwJ+H1/DeMnUnP6sghApYEzRQXw41A6TanRC9fJflq9DQ/xFxCdJgwIgYjGYD2Q8oWnayGb0tQLFECCPa6XaVwBiCM4BwSC2/nB0BAohgF7LkiTNwqnMpUAK1eh1UsNGoCk+HAYJyLhXub1CQRJd2STOEEh7/q0Mxl1J8MwDxTwte7mME2SJ87i1wSRwmnAli7k7GIs0vnlpJrYRgrT0P536P2m7i9c9KAZTy5/xmnf6pO5rBy1UK3z0hrLE3H5SV1UNwdriokJjXRC4zGuGsFjEOHmPsgxAhcEYG6Q7Fjkpkqvj6r4KC5v26LRfa4Q6/6mHu/+OYOnvhuPYHAgE32KVxRoeQTquvWZWFo0rG196n5sEyHjfpykoFJrgYQ6Mh+CCgMZDpICca0kiL9vrG2H3+MjWnt3H2kZh2Tk+hF97OcKAtn1o3DHFm6/Uw+ObnfBxdRkWfttzgAiZOYDPS9v2HCBS/aEOeLfy1ZkIYzIHF3Q3t0Fnww04D4hgd7AN+ls7HL8LIVTWND287aZC5/UW6Gu9bahBWNpaN7yl7G7Oqg2ZtiD2veqvwXvASM6ZH4uOCqYZJH20i8GnsNN3GmgdnIkzGaHqaM6CrQ2Y+j5v9F3FGUPxz84ZR/sgdigJ51CBMHiAGWc09OzWgzM54DRV8xJgLIkzAVJwQTjRTpK8SvMnUAtPG8hSAhNQ+RMdT3ElGlMxFpNQYWDpidHdmIZ+/dJEJVUg79cGxqZNApVWIeO9SYCwPjAWAyaSUG4IfTLjPcFn/aad6FHO+Syu1XK+/9x5Pw4FQ0BqXz+KWZtsyxBtULySKNz4QVf2kc22FtCWWdf1rpKGA2V3Mk7IeTZswt2rEDBYrBqU7Xg0e7rxaCzh1sfL4VTGE3GP4AUQwUWGAUvs6QfT+U7JeQlYQXs40KUQjooIJgKojmz8hIGChV1hGGehw9xadNRzef8P63ljL/ipIlsAAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">1.00x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 428.57<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM/SURBVHgBxVdNTBNBFH4zWyqIweJFCCVZ5CIhsY1cRA+WeOAKB7gpafQOxhgjF8sFYrjAnaRBb3KwHo0HykHwIvZC8IJugvwYIyyEvyC743tLu1m6u+22tOVLNrs7O7Pve99782aGgUcE4kOBaqm6RwJ+H1/DeMnUnP6sghApYEzRQXw41A6TanRC9fJflq9DQ/xFxCdJgwIgYjGYD2Q8oWnayGb0tQLFECCPa6XaVwBiCM4BwSC2/nB0BAohgF7LkiTNwqnMpUAK1eh1UsNGoCk+HAYJyLhXub1CQRJd2STOEEh7/q0Mxl1J8MwDxTwte7mME2SJ87i1wSRwmnAli7k7GIs0vnlpJrYRgrT0P536P2m7i9c9KAZTy5/xmnf6pO5rBy1UK3z0hrLE3H5SV1UNwdriokJjXRC4zGuGsFjEOHmPsgxAhcEYG6Q7Fjkpkqvj6r4KC5v26LRfa4Q6/6mHu/+OYOnvhuPYHAgE32KVxRoeQTquvWZWFo0rG196n5sEyHjfpykoFJrgYQ6Mh+CCgMZDpICca0kiL9vrG2H3+MjWnt3H2kZh2Tk+hF97OcKAtn1o3DHFm6/Uw+ObnfBxdRkWfttzgAiZOYDPS9v2HCBS/aEOeLfy1ZkIYzIHF3Q3t0Fnww04D4hgd7AN+ls7HL8LIVTWND287aZC5/UW6Gu9bahBWNpaN7yl7G7Oqg2ZtiD2veqvwXvASM6ZH4uOCqYZJH20i8GnsNN3GmgdnIkzGaHqaM6CrQ2Y+j5v9F3FGUPxz84ZR/sgdigJ51CBMHiAGWc09OzWgzM54DRV8xJgLIkzAVJwQTjRTpK8SvMnUAtPG8hSAhNQ+RMdT3ElGlMxFpNQYWDpidHdmIZ+/dJEJVUg79cGxqZNApVWIeO9SYCwPjAWAyaSUG4IfTLjPcFn/aad6FHO+Syu1XK+/9x5Pw4FQ0BqXz+KWZtsyxBtULySKNz4QVf2kc22FtCWWdf1rpKGA2V3Mk7IeTZswt2rEDBYrBqU7Xg0e7rxaCzh1sfL4VTGE3GP4AUQwUWGAUvs6QfT+U7JeQlYQXs40KUQjooIJgKojmz8hIGChV1hGGehw9xadNRzef8P63ljL/ipIlsAAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">连环百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***649</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:28:25</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 714.29<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANvSURBVHgBrVdBTBNBFP0zS4tAiSWRyI018eJJEi/GCJRbb1bUYAyJbUjwZMQjcqA9EI7W4EUTQomGYCSIJ+uJCh44aKwnLibWkySQUA1F3GV3nD/tllpa9q/4kk2m3Zl57/9583eGARGh6HbQMiACTOtlILqAMR0EBNVLBnkQIieAZRnwDPeZrzOptjxlXkYg1m2TxyXhlTIhAQIgZfqsxFqqLQf/IgAjtk1tXDZH4DgQLL4y15oALwKKUWvLsqnD/0HO8Fl9tbLBq/+4FN3uopIHmpl6CND9cs6LMrAjBWDkDab2CoiR3wj74XrYB0TUFMEryINe0t5xikO03w+x/kbZJmWhLAK5DgkoGU4HImKS3MHonSbwAL3EdSAgVEwL2e3hbh+Eew5S33VOg8sXGsADRpylUALUPvcATHs17g42Ug2p4De4CpiV1n6bOhDJoxXpr8TM4m9ILRpARJ77rDPcMrQIdYRjvHrAXeHBkEHk5oyJEHVE7AhyBC6BF0PiN0V6gJ+ndK42Xj2gIfEhKuiVAoRO6VvLePUwOnyCaEgWxF3g+oVTxaad7vCOdk6tkDqn9DpNN1YZgWbS1KoOuB4c0qsmDD0owMamcOsKX77ZcG9iV44hbce8FMBylJ6xa41y4gJMPdurKWSnIGDq+R6MPfyllgx/u0H2yHKw7c9uHbPrFnzftOFFMgCtLVxF+GbFLL/H9tBYAVpl2qcnmuHT+j5sbLkLkMix7ls/o4zBDKX39EQLnO3kMgO2rHqGTLcFgZaiP0aHm5RR8d3A/QJlOhAaRJxS/BUIuwErIUbokKZl5Oj4yn0/MLJDjR5kKW7j6vQqxCxlwMaWreq9AyxMleToASo5HlqRW+0VbttJIGLhrak8UY3VD/uwkDap04BpWeqgqgRk5uVhkYlH1MGTT/b+cjmu+2MZPRlCJNbmiwfUcrXgDXYcLxeU8bgUk08PCNGQ1NQjx8rcyXiZ12mo9bDtPqqI9x/34WXaUFsQCxWV3ECOChyqsaGb8k7A+bK6ermgeCwHWvQlcif1dQV4FUGCEFlJfrWavK4ABz2DP6Qv2DgcB0wk+I6dzCzVvqy6X04xGxoeWtltIEPI2gKzMupkrag9CSgLicjreQBCTPCIvIZ3qiu6PFCUCHOAX1UB7wTYWW0XlupFXI0/qyaAeYGIRS4AAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">0.95x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 678.57<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANvSURBVHgBrVdBTBNBFP0zS4tAiSWRyI018eJJEi/GCJRbb1bUYAyJbUjwZMQjcqA9EI7W4EUTQomGYCSIJ+uJCh44aKwnLibWkySQUA1F3GV3nD/tllpa9q/4kk2m3Zl57/9583eGARGh6HbQMiACTOtlILqAMR0EBNVLBnkQIieAZRnwDPeZrzOptjxlXkYg1m2TxyXhlTIhAQIgZfqsxFqqLQf/IgAjtk1tXDZH4DgQLL4y15oALwKKUWvLsqnD/0HO8Fl9tbLBq/+4FN3uopIHmpl6CND9cs6LMrAjBWDkDab2CoiR3wj74XrYB0TUFMEryINe0t5xikO03w+x/kbZJmWhLAK5DgkoGU4HImKS3MHonSbwAL3EdSAgVEwL2e3hbh+Eew5S33VOg8sXGsADRpylUALUPvcATHs17g42Ug2p4De4CpiV1n6bOhDJoxXpr8TM4m9ILRpARJ77rDPcMrQIdYRjvHrAXeHBkEHk5oyJEHVE7AhyBC6BF0PiN0V6gJ+ndK42Xj2gIfEhKuiVAoRO6VvLePUwOnyCaEgWxF3g+oVTxaad7vCOdk6tkDqn9DpNN1YZgWbS1KoOuB4c0qsmDD0owMamcOsKX77ZcG9iV44hbce8FMBylJ6xa41y4gJMPdurKWSnIGDq+R6MPfyllgx/u0H2yHKw7c9uHbPrFnzftOFFMgCtLVxF+GbFLL/H9tBYAVpl2qcnmuHT+j5sbLkLkMix7ls/o4zBDKX39EQLnO3kMgO2rHqGTLcFgZaiP0aHm5RR8d3A/QJlOhAaRJxS/BUIuwErIUbokKZl5Oj4yn0/MLJDjR5kKW7j6vQqxCxlwMaWreq9AyxMleToASo5HlqRW+0VbttJIGLhrak8UY3VD/uwkDap04BpWeqgqgRk5uVhkYlH1MGTT/b+cjmu+2MZPRlCJNbmiwfUcrXgDXYcLxeU8bgUk08PCNGQ1NQjx8rcyXiZ12mo9bDtPqqI9x/34WXaUFsQCxWV3ECOChyqsaGb8k7A+bK6ermgeCwHWvQlcif1dQV4FUGCEFlJfrWavK4ABz2DP6Qv2DgcB0wk+I6dzCzVvqy6X04xGxoeWtltIEPI2gKzMupkrag9CSgLicjreQBCTPCIvIZ3qiu6PFCUCHOAX1UB7wTYWW0XlupFXI0/qyaAeYGIRS4AAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">普通百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***gao</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:28:16</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 714.29<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQhSURBVHgBrVfPbxNXEJ55u7aTtE1diUNoguTkVNRKyamllao6EmrT9gI9oJ4qVLWnNoW0f0CcP4CawBEJCCdAIMEFAUJKEAd+nHxB4UQsBRIOSIQEEhyv32NmvF42znrfLvBJjl/kt2+++ebHm0VICFPO519C175MRn1nDIxogAIC5OU3gBUEUwHEqq6byz2wMYcTKytJzkXbhrVyXzHjqkNksNgyaCXLhBAuQV1PdU88qcLbEGCPa84HkwbNYXg3lLrHl6YgDYGNcl8BXDVLywK8B5CRivH0/ig1thF4Ue4fUa6ZTSp3ClTB06PtJFT4H/Y8qXHM9UJKiKqibhQBjjlvSOq58+W/kPvtDmT2ltOQIRJ4KpIAJxxYYo4fDbwhMPQjYO8uUINjYGqr9NsuyO6/AM5nByyEsLh+bGeQ2C7/YVmSZHv2l4sklQG9dDsgox/fbnrS/7V8cMfnUHtwPvYchThJip/mXiEKaBdLYIGig9koe81eBv6Qt2zYGRrbQigO1Cfy66pHHEa/5BZsD7HEYmj3AfnuhAZ57909AmbtUfx51Ky6xpc+wRfH+g86aE5BUpDHXX/Oy9KsLgJsrorsYXBOeLcmhUwcPNCjLqIuJujIAcLe64WrUL9VCtRRFAZn6AcJC1eHWVuMDYljcEQh4DCkgDM4FqwbD6/JNxtib+tXfofazJ5Afg5XHFDhMCdhAVJADXzTNLoa7Z2QmT/XNNAWmm176VZVaVqulJlfflwNuV+vQ+bbqW1JqfqbJIFyIQ5s24UUUBTfLQeQhw5/hv+QxGNFWmXJaMzHJyFf225zmEjYfkOeblK8HfK01XzYsBMi6N07Yq0CGmJWWIEqfUbAAs503PGFrNlTTQmo/SRsVYH71X8SIv30PhH433Yk5QA+d0HjTVAmkgB3vyzFmQ1KzftoPLy69SCpgkX55vug1TVtzYienHM1QsXp8DP6kktMQ/Kz3JEGLEnXDrfhzeGzciGfczcXovJAWi/1fS698E0Y8CepWR1WhBXK7D0qz/C6dmZPvHVjqt3/LA9KC9yY/rREF/Nkp72c/dmfTgZGgfMh5sqt35iwJqCD+mD27yczzXlA69NcDR03h7rfJh1eO7E7Mr5civUEdwB7z8Z5KX2A5zRSYbqTCg3q+ZD7GFTvgCggFeGHpHb2e/rzvHmuNel8h5QptdZbbqGN4ztneWKxPC91n/35pPRSa6zbYMBM94wvH44mwLOBg7P0hlOABOA8MCkyn8fznLc+Gn5r2nYPpyXxLsYZqn2jzO0NM8pNAt4TNJiZKOM+sc54RdMrVceht1aDsp2u24nc+PKlTluso5BMzBnchzo5EXkVA7jc5a0ftb0lJ5/FmMzxvmJzgsIiZXOeUrrgn0KeYtUYU/GUuvnhX48rSc98DR2mtaEoWxGaAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">0.95x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 678.57<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQhSURBVHgBrVfPbxNXEJ55u7aTtE1diUNoguTkVNRKyamllao6EmrT9gI9oJ4qVLWnNoW0f0CcP4CawBEJCCdAIMEFAUJKEAd+nHxB4UQsBRIOSIQEEhyv32NmvF42znrfLvBJjl/kt2+++ebHm0VICFPO519C175MRn1nDIxogAIC5OU3gBUEUwHEqq6byz2wMYcTKytJzkXbhrVyXzHjqkNksNgyaCXLhBAuQV1PdU88qcLbEGCPa84HkwbNYXg3lLrHl6YgDYGNcl8BXDVLywK8B5CRivH0/ig1thF4Ue4fUa6ZTSp3ClTB06PtJFT4H/Y8qXHM9UJKiKqibhQBjjlvSOq58+W/kPvtDmT2ltOQIRJ4KpIAJxxYYo4fDbwhMPQjYO8uUINjYGqr9NsuyO6/AM5nByyEsLh+bGeQ2C7/YVmSZHv2l4sklQG9dDsgox/fbnrS/7V8cMfnUHtwPvYchThJip/mXiEKaBdLYIGig9koe81eBv6Qt2zYGRrbQigO1Cfy66pHHEa/5BZsD7HEYmj3AfnuhAZ57909AmbtUfx51Ky6xpc+wRfH+g86aE5BUpDHXX/Oy9KsLgJsrorsYXBOeLcmhUwcPNCjLqIuJujIAcLe64WrUL9VCtRRFAZn6AcJC1eHWVuMDYljcEQh4DCkgDM4FqwbD6/JNxtib+tXfofazJ5Afg5XHFDhMCdhAVJADXzTNLoa7Z2QmT/XNNAWmm176VZVaVqulJlfflwNuV+vQ+bbqW1JqfqbJIFyIQ5s24UUUBTfLQeQhw5/hv+QxGNFWmXJaMzHJyFf225zmEjYfkOeblK8HfK01XzYsBMi6N07Yq0CGmJWWIEqfUbAAs503PGFrNlTTQmo/SRsVYH71X8SIv30PhH433Yk5QA+d0HjTVAmkgB3vyzFmQ1KzftoPLy69SCpgkX55vug1TVtzYienHM1QsXp8DP6kktMQ/Kz3JEGLEnXDrfhzeGzciGfczcXovJAWi/1fS698E0Y8CepWR1WhBXK7D0qz/C6dmZPvHVjqt3/LA9KC9yY/rREF/Nkp72c/dmfTgZGgfMh5sqt35iwJqCD+mD27yczzXlA69NcDR03h7rfJh1eO7E7Mr5civUEdwB7z8Z5KX2A5zRSYbqTCg3q+ZD7GFTvgCggFeGHpHb2e/rzvHmuNel8h5QptdZbbqGN4ztneWKxPC91n/35pPRSa6zbYMBM94wvH44mwLOBg7P0hlOABOA8MCkyn8fznLc+Gn5r2nYPpyXxLsYZqn2jzO0NM8pNAt4TNJiZKOM+sc54RdMrVceht1aDsp2u24nc+PKlTluso5BMzBnchzo5EXkVA7jc5a0ftb0lJ5/FmMzxvmJzgsIiZXOeUrrgn0KeYtUYU/GUuvnhX48rSc98DR2mtaEoWxGaAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">普通百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***797</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:28:09</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 449.17<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQhSURBVHgBrVfPbxNXEJ55u7aTtE1diUNoguTkVNRKyamllao6EmrT9gI9oJ4qVLWnNoW0f0CcP4CawBEJCCdAIMEFAUJKEAd+nHxB4UQsBRIOSIQEEhyv32NmvF42znrfLvBJjl/kt2+++ebHm0VICFPO519C175MRn1nDIxogAIC5OU3gBUEUwHEqq6byz2wMYcTKytJzkXbhrVyXzHjqkNksNgyaCXLhBAuQV1PdU88qcLbEGCPa84HkwbNYXg3lLrHl6YgDYGNcl8BXDVLywK8B5CRivH0/ig1thF4Ue4fUa6ZTSp3ClTB06PtJFT4H/Y8qXHM9UJKiKqibhQBjjlvSOq58+W/kPvtDmT2ltOQIRJ4KpIAJxxYYo4fDbwhMPQjYO8uUINjYGqr9NsuyO6/AM5nByyEsLh+bGeQ2C7/YVmSZHv2l4sklQG9dDsgox/fbnrS/7V8cMfnUHtwPvYchThJip/mXiEKaBdLYIGig9koe81eBv6Qt2zYGRrbQigO1Cfy66pHHEa/5BZsD7HEYmj3AfnuhAZ57909AmbtUfx51Ky6xpc+wRfH+g86aE5BUpDHXX/Oy9KsLgJsrorsYXBOeLcmhUwcPNCjLqIuJujIAcLe64WrUL9VCtRRFAZn6AcJC1eHWVuMDYljcEQh4DCkgDM4FqwbD6/JNxtib+tXfofazJ5Afg5XHFDhMCdhAVJADXzTNLoa7Z2QmT/XNNAWmm176VZVaVqulJlfflwNuV+vQ+bbqW1JqfqbJIFyIQ5s24UUUBTfLQeQhw5/hv+QxGNFWmXJaMzHJyFf225zmEjYfkOeblK8HfK01XzYsBMi6N07Yq0CGmJWWIEqfUbAAs503PGFrNlTTQmo/SRsVYH71X8SIv30PhH433Yk5QA+d0HjTVAmkgB3vyzFmQ1KzftoPLy69SCpgkX55vug1TVtzYienHM1QsXp8DP6kktMQ/Kz3JEGLEnXDrfhzeGzciGfczcXovJAWi/1fS698E0Y8CepWR1WhBXK7D0qz/C6dmZPvHVjqt3/LA9KC9yY/rREF/Nkp72c/dmfTgZGgfMh5sqt35iwJqCD+mD27yczzXlA69NcDR03h7rfJh1eO7E7Mr5civUEdwB7z8Z5KX2A5zRSYbqTCg3q+ZD7GFTvgCggFeGHpHb2e/rzvHmuNel8h5QptdZbbqGN4ztneWKxPC91n/35pPRSa6zbYMBM94wvH44mwLOBg7P0hlOABOA8MCkyn8fznLc+Gn5r2nYPpyXxLsYZqn2jzO0NM8pNAt4TNJiZKOM+sc54RdMrVceht1aDsp2u24nc+PKlTluso5BMzBnchzo5EXkVA7jc5a0ftb0lJ5/FmMzxvmJzgsIiZXOeUrrgn0KeYtUYU/GUuvnhX48rSc98DR2mtaEoWxGaAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">0.95x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 426.72<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQhSURBVHgBrVfPbxNXEJ55u7aTtE1diUNoguTkVNRKyamllao6EmrT9gI9oJ4qVLWnNoW0f0CcP4CawBEJCCdAIMEFAUJKEAd+nHxB4UQsBRIOSIQEEhyv32NmvF42znrfLvBJjl/kt2+++ebHm0VICFPO519C175MRn1nDIxogAIC5OU3gBUEUwHEqq6byz2wMYcTKytJzkXbhrVyXzHjqkNksNgyaCXLhBAuQV1PdU88qcLbEGCPa84HkwbNYXg3lLrHl6YgDYGNcl8BXDVLywK8B5CRivH0/ig1thF4Ue4fUa6ZTSp3ClTB06PtJFT4H/Y8qXHM9UJKiKqibhQBjjlvSOq58+W/kPvtDmT2ltOQIRJ4KpIAJxxYYo4fDbwhMPQjYO8uUINjYGqr9NsuyO6/AM5nByyEsLh+bGeQ2C7/YVmSZHv2l4sklQG9dDsgox/fbnrS/7V8cMfnUHtwPvYchThJip/mXiEKaBdLYIGig9koe81eBv6Qt2zYGRrbQigO1Cfy66pHHEa/5BZsD7HEYmj3AfnuhAZ57909AmbtUfx51Ky6xpc+wRfH+g86aE5BUpDHXX/Oy9KsLgJsrorsYXBOeLcmhUwcPNCjLqIuJujIAcLe64WrUL9VCtRRFAZn6AcJC1eHWVuMDYljcEQh4DCkgDM4FqwbD6/JNxtib+tXfofazJ5Afg5XHFDhMCdhAVJADXzTNLoa7Z2QmT/XNNAWmm176VZVaVqulJlfflwNuV+vQ+bbqW1JqfqbJIFyIQ5s24UUUBTfLQeQhw5/hv+QxGNFWmXJaMzHJyFf225zmEjYfkOeblK8HfK01XzYsBMi6N07Yq0CGmJWWIEqfUbAAs503PGFrNlTTQmo/SRsVYH71X8SIv30PhH433Yk5QA+d0HjTVAmkgB3vyzFmQ1KzftoPLy69SCpgkX55vug1TVtzYienHM1QsXp8DP6kktMQ/Kz3JEGLEnXDrfhzeGzciGfczcXovJAWi/1fS698E0Y8CepWR1WhBXK7D0qz/C6dmZPvHVjqt3/LA9KC9yY/rREF/Nkp72c/dmfTgZGgfMh5sqt35iwJqCD+mD27yczzXlA69NcDR03h7rfJh1eO7E7Mr5civUEdwB7z8Z5KX2A5zRSYbqTCg3q+ZD7GFTvgCggFeGHpHb2e/rzvHmuNel8h5QptdZbbqGN4ztneWKxPC91n/35pPRSa6zbYMBM94wvH44mwLOBg7P0hlOABOA8MCkyn8fznLc+Gn5r2nYPpyXxLsYZqn2jzO0NM8pNAt4TNJiZKOM+sc54RdMrVceht1aDsp2u24nc+PKlTluso5BMzBnchzo5EXkVA7jc5a0ftb0lJ5/FmMzxvmJzgsIiZXOeUrrgn0KeYtUYU/GUuvnhX48rSc98DR2mtaEoWxGaAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">普通百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***027</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:27:48</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 857.14<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQhSURBVHgBrVfPbxNXEJ55u7aTtE1diUNoguTkVNRKyamllao6EmrT9gI9oJ4qVLWnNoW0f0CcP4CawBEJCCdAIMEFAUJKEAd+nHxB4UQsBRIOSIQEEhyv32NmvF42znrfLvBJjl/kt2+++ebHm0VICFPO519C175MRn1nDIxogAIC5OU3gBUEUwHEqq6byz2wMYcTKytJzkXbhrVyXzHjqkNksNgyaCXLhBAuQV1PdU88qcLbEGCPa84HkwbNYXg3lLrHl6YgDYGNcl8BXDVLywK8B5CRivH0/ig1thF4Ue4fUa6ZTSp3ClTB06PtJFT4H/Y8qXHM9UJKiKqibhQBjjlvSOq58+W/kPvtDmT2ltOQIRJ4KpIAJxxYYo4fDbwhMPQjYO8uUINjYGqr9NsuyO6/AM5nByyEsLh+bGeQ2C7/YVmSZHv2l4sklQG9dDsgox/fbnrS/7V8cMfnUHtwPvYchThJip/mXiEKaBdLYIGig9koe81eBv6Qt2zYGRrbQigO1Cfy66pHHEa/5BZsD7HEYmj3AfnuhAZ57909AmbtUfx51Ky6xpc+wRfH+g86aE5BUpDHXX/Oy9KsLgJsrorsYXBOeLcmhUwcPNCjLqIuJujIAcLe64WrUL9VCtRRFAZn6AcJC1eHWVuMDYljcEQh4DCkgDM4FqwbD6/JNxtib+tXfofazJ5Afg5XHFDhMCdhAVJADXzTNLoa7Z2QmT/XNNAWmm176VZVaVqulJlfflwNuV+vQ+bbqW1JqfqbJIFyIQ5s24UUUBTfLQeQhw5/hv+QxGNFWmXJaMzHJyFf225zmEjYfkOeblK8HfK01XzYsBMi6N07Yq0CGmJWWIEqfUbAAs503PGFrNlTTQmo/SRsVYH71X8SIv30PhH433Yk5QA+d0HjTVAmkgB3vyzFmQ1KzftoPLy69SCpgkX55vug1TVtzYienHM1QsXp8DP6kktMQ/Kz3JEGLEnXDrfhzeGzciGfczcXovJAWi/1fS698E0Y8CepWR1WhBXK7D0qz/C6dmZPvHVjqt3/LA9KC9yY/rREF/Nkp72c/dmfTgZGgfMh5sqt35iwJqCD+mD27yczzXlA69NcDR03h7rfJh1eO7E7Mr5civUEdwB7z8Z5KX2A5zRSYbqTCg3q+ZD7GFTvgCggFeGHpHb2e/rzvHmuNel8h5QptdZbbqGN4ztneWKxPC91n/35pPRSa6zbYMBM94wvH44mwLOBg7P0hlOABOA8MCkyn8fznLc+Gn5r2nYPpyXxLsYZqn2jzO0NM8pNAt4TNJiZKOM+sc54RdMrVceht1aDsp2u24nc+PKlTluso5BMzBnchzo5EXkVA7jc5a0ftb0lJ5/FmMzxvmJzgsIiZXOeUrrgn0KeYtUYU/GUuvnhX48rSc98DR2mtaEoWxGaAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">1.00x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 857.14<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQhSURBVHgBrVfPbxNXEJ55u7aTtE1diUNoguTkVNRKyamllao6EmrT9gI9oJ4qVLWnNoW0f0CcP4CawBEJCCdAIMEFAUJKEAd+nHxB4UQsBRIOSIQEEhyv32NmvF42znrfLvBJjl/kt2+++ebHm0VICFPO519C175MRn1nDIxogAIC5OU3gBUEUwHEqq6byz2wMYcTKytJzkXbhrVyXzHjqkNksNgyaCXLhBAuQV1PdU88qcLbEGCPa84HkwbNYXg3lLrHl6YgDYGNcl8BXDVLywK8B5CRivH0/ig1thF4Ue4fUa6ZTSp3ClTB06PtJFT4H/Y8qXHM9UJKiKqibhQBjjlvSOq58+W/kPvtDmT2ltOQIRJ4KpIAJxxYYo4fDbwhMPQjYO8uUINjYGqr9NsuyO6/AM5nByyEsLh+bGeQ2C7/YVmSZHv2l4sklQG9dDsgox/fbnrS/7V8cMfnUHtwPvYchThJip/mXiEKaBdLYIGig9koe81eBv6Qt2zYGRrbQigO1Cfy66pHHEa/5BZsD7HEYmj3AfnuhAZ57909AmbtUfx51Ky6xpc+wRfH+g86aE5BUpDHXX/Oy9KsLgJsrorsYXBOeLcmhUwcPNCjLqIuJujIAcLe64WrUL9VCtRRFAZn6AcJC1eHWVuMDYljcEQh4DCkgDM4FqwbD6/JNxtib+tXfofazJ5Afg5XHFDhMCdhAVJADXzTNLoa7Z2QmT/XNNAWmm176VZVaVqulJlfflwNuV+vQ+bbqW1JqfqbJIFyIQ5s24UUUBTfLQeQhw5/hv+QxGNFWmXJaMzHJyFf225zmEjYfkOeblK8HfK01XzYsBMi6N07Yq0CGmJWWIEqfUbAAs503PGFrNlTTQmo/SRsVYH71X8SIv30PhH433Yk5QA+d0HjTVAmkgB3vyzFmQ1KzftoPLy69SCpgkX55vug1TVtzYienHM1QsXp8DP6kktMQ/Kz3JEGLEnXDrfhzeGzciGfczcXovJAWi/1fS698E0Y8CepWR1WhBXK7D0qz/C6dmZPvHVjqt3/LA9KC9yY/rREF/Nkp72c/dmfTgZGgfMh5sqt35iwJqCD+mD27yczzXlA69NcDR03h7rfJh1eO7E7Mr5civUEdwB7z8Z5KX2A5zRSYbqTCg3q+ZD7GFTvgCggFeGHpHb2e/rzvHmuNel8h5QptdZbbqGN4ztneWKxPC91n/35pPRSa6zbYMBM94wvH44mwLOBg7P0hlOABOA8MCkyn8fznLc+Gn5r2nYPpyXxLsYZqn2jzO0NM8pNAt4TNJiZKOM+sc54RdMrVceht1aDsp2u24nc+PKlTluso5BMzBnchzo5EXkVA7jc5a0ftb0lJ5/FmMzxvmJzgsIiZXOeUrrgn0KeYtUYU/GUuvnhX48rSc98DR2mtaEoWxGaAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***iao</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:27:37</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 571.43<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM/SURBVHgBxVdNTBNBFH4zWyqIweJFCCVZ5CIhsY1cRA+WeOAKB7gpafQOxhgjF8sFYrjAnaRBb3KwHo0HykHwIvZC8IJugvwYIyyEvyC743tLu1m6u+22tOVLNrs7O7Pve99782aGgUcE4kOBaqm6RwJ+H1/DeMnUnP6sghApYEzRQXw41A6TanRC9fJflq9DQ/xFxCdJgwIgYjGYD2Q8oWnayGb0tQLFECCPa6XaVwBiCM4BwSC2/nB0BAohgF7LkiTNwqnMpUAK1eh1UsNGoCk+HAYJyLhXub1CQRJd2STOEEh7/q0Mxl1J8MwDxTwte7mME2SJ87i1wSRwmnAli7k7GIs0vnlpJrYRgrT0P536P2m7i9c9KAZTy5/xmnf6pO5rBy1UK3z0hrLE3H5SV1UNwdriokJjXRC4zGuGsFjEOHmPsgxAhcEYG6Q7Fjkpkqvj6r4KC5v26LRfa4Q6/6mHu/+OYOnvhuPYHAgE32KVxRoeQTquvWZWFo0rG196n5sEyHjfpykoFJrgYQ6Mh+CCgMZDpICca0kiL9vrG2H3+MjWnt3H2kZh2Tk+hF97OcKAtn1o3DHFm6/Uw+ObnfBxdRkWfttzgAiZOYDPS9v2HCBS/aEOeLfy1ZkIYzIHF3Q3t0Fnww04D4hgd7AN+ls7HL8LIVTWND287aZC5/UW6Gu9bahBWNpaN7yl7G7Oqg2ZtiD2veqvwXvASM6ZH4uOCqYZJH20i8GnsNN3GmgdnIkzGaHqaM6CrQ2Y+j5v9F3FGUPxz84ZR/sgdigJ51CBMHiAGWc09OzWgzM54DRV8xJgLIkzAVJwQTjRTpK8SvMnUAtPG8hSAhNQ+RMdT3ElGlMxFpNQYWDpidHdmIZ+/dJEJVUg79cGxqZNApVWIeO9SYCwPjAWAyaSUG4IfTLjPcFn/aad6FHO+Syu1XK+/9x5Pw4FQ0BqXz+KWZtsyxBtULySKNz4QVf2kc22FtCWWdf1rpKGA2V3Mk7IeTZswt2rEDBYrBqU7Xg0e7rxaCzh1sfL4VTGE3GP4AUQwUWGAUvs6QfT+U7JeQlYQXs40KUQjooIJgKojmz8hIGChV1hGGehw9xadNRzef8P63ljL/ipIlsAAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">0.95x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 542.86<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM/SURBVHgBxVdNTBNBFH4zWyqIweJFCCVZ5CIhsY1cRA+WeOAKB7gpafQOxhgjF8sFYrjAnaRBb3KwHo0HykHwIvZC8IJugvwYIyyEvyC743tLu1m6u+22tOVLNrs7O7Pve99782aGgUcE4kOBaqm6RwJ+H1/DeMnUnP6sghApYEzRQXw41A6TanRC9fJflq9DQ/xFxCdJgwIgYjGYD2Q8oWnayGb0tQLFECCPa6XaVwBiCM4BwSC2/nB0BAohgF7LkiTNwqnMpUAK1eh1UsNGoCk+HAYJyLhXub1CQRJd2STOEEh7/q0Mxl1J8MwDxTwte7mME2SJ87i1wSRwmnAli7k7GIs0vnlpJrYRgrT0P536P2m7i9c9KAZTy5/xmnf6pO5rBy1UK3z0hrLE3H5SV1UNwdriokJjXRC4zGuGsFjEOHmPsgxAhcEYG6Q7Fjkpkqvj6r4KC5v26LRfa4Q6/6mHu/+OYOnvhuPYHAgE32KVxRoeQTquvWZWFo0rG196n5sEyHjfpykoFJrgYQ6Mh+CCgMZDpICca0kiL9vrG2H3+MjWnt3H2kZh2Tk+hF97OcKAtn1o3DHFm6/Uw+ObnfBxdRkWfttzgAiZOYDPS9v2HCBS/aEOeLfy1ZkIYzIHF3Q3t0Fnww04D4hgd7AN+ls7HL8LIVTWND287aZC5/UW6Gu9bahBWNpaN7yl7G7Oqg2ZtiD2veqvwXvASM6ZH4uOCqYZJH20i8GnsNN3GmgdnIkzGaHqaM6CrQ2Y+j5v9F3FGUPxz84ZR/sgdigJ51CBMHiAGWc09OzWgzM54DRV8xJgLIkzAVJwQTjRTpK8SvMnUAtPG8hSAhNQ+RMdT3ElGlMxFpNQYWDpidHdmIZ+/dJEJVUg79cGxqZNApVWIeO9SYCwPjAWAyaSUG4IfTLjPcFn/aad6FHO+Syu1XK+/9x5Pw4FQ0BqXz+KWZtsyxBtULySKNz4QVf2kc22FtCWWdf1rpKGA2V3Mk7IeTZswt2rEDBYrBqU7Xg0e7rxaCzh1sfL4VTGE3GP4AUQwUWGAUvs6QfT+U7JeQlYQXs40KUQjooIJgKojmz8hIGChV1hGGehw9xadNRzef8P63ljL/ipIlsAAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***y12</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:27:29</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 400.00<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQhSURBVHgBrVfPbxNXEJ55u7aTtE1diUNoguTkVNRKyamllao6EmrT9gI9oJ4qVLWnNoW0f0CcP4CawBEJCCdAIMEFAUJKEAd+nHxB4UQsBRIOSIQEEhyv32NmvF42znrfLvBJjl/kt2+++ebHm0VICFPO519C175MRn1nDIxogAIC5OU3gBUEUwHEqq6byz2wMYcTKytJzkXbhrVyXzHjqkNksNgyaCXLhBAuQV1PdU88qcLbEGCPa84HkwbNYXg3lLrHl6YgDYGNcl8BXDVLywK8B5CRivH0/ig1thF4Ue4fUa6ZTSp3ClTB06PtJFT4H/Y8qXHM9UJKiKqibhQBjjlvSOq58+W/kPvtDmT2ltOQIRJ4KpIAJxxYYo4fDbwhMPQjYO8uUINjYGqr9NsuyO6/AM5nByyEsLh+bGeQ2C7/YVmSZHv2l4sklQG9dDsgox/fbnrS/7V8cMfnUHtwPvYchThJip/mXiEKaBdLYIGig9koe81eBv6Qt2zYGRrbQigO1Cfy66pHHEa/5BZsD7HEYmj3AfnuhAZ57909AmbtUfx51Ky6xpc+wRfH+g86aE5BUpDHXX/Oy9KsLgJsrorsYXBOeLcmhUwcPNCjLqIuJujIAcLe64WrUL9VCtRRFAZn6AcJC1eHWVuMDYljcEQh4DCkgDM4FqwbD6/JNxtib+tXfofazJ5Afg5XHFDhMCdhAVJADXzTNLoa7Z2QmT/XNNAWmm176VZVaVqulJlfflwNuV+vQ+bbqW1JqfqbJIFyIQ5s24UUUBTfLQeQhw5/hv+QxGNFWmXJaMzHJyFf225zmEjYfkOeblK8HfK01XzYsBMi6N07Yq0CGmJWWIEqfUbAAs503PGFrNlTTQmo/SRsVYH71X8SIv30PhH433Yk5QA+d0HjTVAmkgB3vyzFmQ1KzftoPLy69SCpgkX55vug1TVtzYienHM1QsXp8DP6kktMQ/Kz3JEGLEnXDrfhzeGzciGfczcXovJAWi/1fS698E0Y8CepWR1WhBXK7D0qz/C6dmZPvHVjqt3/LA9KC9yY/rREF/Nkp72c/dmfTgZGgfMh5sqt35iwJqCD+mD27yczzXlA69NcDR03h7rfJh1eO7E7Mr5civUEdwB7z8Z5KX2A5zRSYbqTCg3q+ZD7GFTvgCggFeGHpHb2e/rzvHmuNel8h5QptdZbbqGN4ztneWKxPC91n/35pPRSa6zbYMBM94wvH44mwLOBg7P0hlOABOA8MCkyn8fznLc+Gn5r2nYPpyXxLsYZqn2jzO0NM8pNAt4TNJiZKOM+sc54RdMrVceht1aDsp2u24nc+PKlTluso5BMzBnchzo5EXkVA7jc5a0ftb0lJ5/FmMzxvmJzgsIiZXOeUrrgn0KeYtUYU/GUuvnhX48rSc98DR2mtaEoWxGaAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">0.95x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 380.00<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQhSURBVHgBrVfPbxNXEJ55u7aTtE1diUNoguTkVNRKyamllao6EmrT9gI9oJ4qVLWnNoW0f0CcP4CawBEJCCdAIMEFAUJKEAd+nHxB4UQsBRIOSIQEEhyv32NmvF42znrfLvBJjl/kt2+++ebHm0VICFPO519C175MRn1nDIxogAIC5OU3gBUEUwHEqq6byz2wMYcTKytJzkXbhrVyXzHjqkNksNgyaCXLhBAuQV1PdU88qcLbEGCPa84HkwbNYXg3lLrHl6YgDYGNcl8BXDVLywK8B5CRivH0/ig1thF4Ue4fUa6ZTSp3ClTB06PtJFT4H/Y8qXHM9UJKiKqibhQBjjlvSOq58+W/kPvtDmT2ltOQIRJ4KpIAJxxYYo4fDbwhMPQjYO8uUINjYGqr9NsuyO6/AM5nByyEsLh+bGeQ2C7/YVmSZHv2l4sklQG9dDsgox/fbnrS/7V8cMfnUHtwPvYchThJip/mXiEKaBdLYIGig9koe81eBv6Qt2zYGRrbQigO1Cfy66pHHEa/5BZsD7HEYmj3AfnuhAZ57909AmbtUfx51Ky6xpc+wRfH+g86aE5BUpDHXX/Oy9KsLgJsrorsYXBOeLcmhUwcPNCjLqIuJujIAcLe64WrUL9VCtRRFAZn6AcJC1eHWVuMDYljcEQh4DCkgDM4FqwbD6/JNxtib+tXfofazJ5Afg5XHFDhMCdhAVJADXzTNLoa7Z2QmT/XNNAWmm176VZVaVqulJlfflwNuV+vQ+bbqW1JqfqbJIFyIQ5s24UUUBTfLQeQhw5/hv+QxGNFWmXJaMzHJyFf225zmEjYfkOeblK8HfK01XzYsBMi6N07Yq0CGmJWWIEqfUbAAs503PGFrNlTTQmo/SRsVYH71X8SIv30PhH433Yk5QA+d0HjTVAmkgB3vyzFmQ1KzftoPLy69SCpgkX55vug1TVtzYienHM1QsXp8DP6kktMQ/Kz3JEGLEnXDrfhzeGzciGfczcXovJAWi/1fS698E0Y8CepWR1WhBXK7D0qz/C6dmZPvHVjqt3/LA9KC9yY/rREF/Nkp72c/dmfTgZGgfMh5sqt35iwJqCD+mD27yczzXlA69NcDR03h7rfJh1eO7E7Mr5civUEdwB7z8Z5KX2A5zRSYbqTCg3q+ZD7GFTvgCggFeGHpHb2e/rzvHmuNel8h5QptdZbbqGN4ztneWKxPC91n/35pPRSa6zbYMBM94wvH44mwLOBg7P0hlOABOA8MCkyn8fznLc+Gn5r2nYPpyXxLsYZqn2jzO0NM8pNAt4TNJiZKOM+sc54RdMrVceht1aDsp2u24nc+PKlTluso5BMzBnchzo5EXkVA7jc5a0ftb0lJ5/FmMzxvmJzgsIiZXOeUrrgn0KeYtUYU/GUuvnhX48rSc98DR2mtaEoWxGaAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">普通百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***797</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:27:24</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 390.59<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANvSURBVHgBrVdBTBNBFP0zS4tAiSWRyI018eJJEi/GCJRbb1bUYAyJbUjwZMQjcqA9EI7W4EUTQomGYCSIJ+uJCh44aKwnLibWkySQUA1F3GV3nD/tllpa9q/4kk2m3Zl57/9583eGARGh6HbQMiACTOtlILqAMR0EBNVLBnkQIieAZRnwDPeZrzOptjxlXkYg1m2TxyXhlTIhAQIgZfqsxFqqLQf/IgAjtk1tXDZH4DgQLL4y15oALwKKUWvLsqnD/0HO8Fl9tbLBq/+4FN3uopIHmpl6CND9cs6LMrAjBWDkDab2CoiR3wj74XrYB0TUFMEryINe0t5xikO03w+x/kbZJmWhLAK5DgkoGU4HImKS3MHonSbwAL3EdSAgVEwL2e3hbh+Eew5S33VOg8sXGsADRpylUALUPvcATHs17g42Ug2p4De4CpiV1n6bOhDJoxXpr8TM4m9ILRpARJ77rDPcMrQIdYRjvHrAXeHBkEHk5oyJEHVE7AhyBC6BF0PiN0V6gJ+ndK42Xj2gIfEhKuiVAoRO6VvLePUwOnyCaEgWxF3g+oVTxaad7vCOdk6tkDqn9DpNN1YZgWbS1KoOuB4c0qsmDD0owMamcOsKX77ZcG9iV44hbce8FMBylJ6xa41y4gJMPdurKWSnIGDq+R6MPfyllgx/u0H2yHKw7c9uHbPrFnzftOFFMgCtLVxF+GbFLL/H9tBYAVpl2qcnmuHT+j5sbLkLkMix7ls/o4zBDKX39EQLnO3kMgO2rHqGTLcFgZaiP0aHm5RR8d3A/QJlOhAaRJxS/BUIuwErIUbokKZl5Oj4yn0/MLJDjR5kKW7j6vQqxCxlwMaWreq9AyxMleToASo5HlqRW+0VbttJIGLhrak8UY3VD/uwkDap04BpWeqgqgRk5uVhkYlH1MGTT/b+cjmu+2MZPRlCJNbmiwfUcrXgDXYcLxeU8bgUk08PCNGQ1NQjx8rcyXiZ12mo9bDtPqqI9x/34WXaUFsQCxWV3ECOChyqsaGb8k7A+bK6ermgeCwHWvQlcif1dQV4FUGCEFlJfrWavK4ABz2DP6Qv2DgcB0wk+I6dzCzVvqy6X04xGxoeWtltIEPI2gKzMupkrag9CSgLicjreQBCTPCIvIZ3qiu6PFCUCHOAX1UB7wTYWW0XlupFXI0/qyaAeYGIRS4AAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">0.95x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 371.06<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANvSURBVHgBrVdBTBNBFP0zS4tAiSWRyI018eJJEi/GCJRbb1bUYAyJbUjwZMQjcqA9EI7W4EUTQomGYCSIJ+uJCh44aKwnLibWkySQUA1F3GV3nD/tllpa9q/4kk2m3Zl57/9583eGARGh6HbQMiACTOtlILqAMR0EBNVLBnkQIieAZRnwDPeZrzOptjxlXkYg1m2TxyXhlTIhAQIgZfqsxFqqLQf/IgAjtk1tXDZH4DgQLL4y15oALwKKUWvLsqnD/0HO8Fl9tbLBq/+4FN3uopIHmpl6CND9cs6LMrAjBWDkDab2CoiR3wj74XrYB0TUFMEryINe0t5xikO03w+x/kbZJmWhLAK5DgkoGU4HImKS3MHonSbwAL3EdSAgVEwL2e3hbh+Eew5S33VOg8sXGsADRpylUALUPvcATHs17g42Ug2p4De4CpiV1n6bOhDJoxXpr8TM4m9ILRpARJ77rDPcMrQIdYRjvHrAXeHBkEHk5oyJEHVE7AhyBC6BF0PiN0V6gJ+ndK42Xj2gIfEhKuiVAoRO6VvLePUwOnyCaEgWxF3g+oVTxaad7vCOdk6tkDqn9DpNN1YZgWbS1KoOuB4c0qsmDD0owMamcOsKX77ZcG9iV44hbce8FMBylJ6xa41y4gJMPdurKWSnIGDq+R6MPfyllgx/u0H2yHKw7c9uHbPrFnzftOFFMgCtLVxF+GbFLL/H9tBYAVpl2qcnmuHT+j5sbLkLkMix7ls/o4zBDKX39EQLnO3kMgO2rHqGTLcFgZaiP0aHm5RR8d3A/QJlOhAaRJxS/BUIuwErIUbokKZl5Oj4yn0/MLJDjR5kKW7j6vQqxCxlwMaWreq9AyxMleToASo5HlqRW+0VbttJIGLhrak8UY3VD/uwkDap04BpWeqgqgRk5uVhkYlH1MGTT/b+cjmu+2MZPRlCJNbmiwfUcrXgDXYcLxeU8bgUk08PCNGQ1NQjx8rcyXiZ12mo9bDtPqqI9x/34WXaUFsQCxWV3ECOChyqsaGb8k7A+bK6ermgeCwHWvQlcif1dQV4FUGCEFlJfrWavK4ABz2DP6Qv2DgcB0wk+I6dzCzVvqy6X04xGxoeWtltIEPI2gKzMupkrag9CSgLicjreQBCTPCIvIZ3qiu6PFCUCHOAX1UB7wTYWW0XlupFXI0/qyaAeYGIRS4AAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***929</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:27:11</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 900.00<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQhSURBVHgBrVfPbxNXEJ55u7aTtE1diUNoguTkVNRKyamllao6EmrT9gI9oJ4qVLWnNoW0f0CcP4CawBEJCCdAIMEFAUJKEAd+nHxB4UQsBRIOSIQEEhyv32NmvF42znrfLvBJjl/kt2+++ebHm0VICFPO519C175MRn1nDIxogAIC5OU3gBUEUwHEqq6byz2wMYcTKytJzkXbhrVyXzHjqkNksNgyaCXLhBAuQV1PdU88qcLbEGCPa84HkwbNYXg3lLrHl6YgDYGNcl8BXDVLywK8B5CRivH0/ig1thF4Ue4fUa6ZTSp3ClTB06PtJFT4H/Y8qXHM9UJKiKqibhQBjjlvSOq58+W/kPvtDmT2ltOQIRJ4KpIAJxxYYo4fDbwhMPQjYO8uUINjYGqr9NsuyO6/AM5nByyEsLh+bGeQ2C7/YVmSZHv2l4sklQG9dDsgox/fbnrS/7V8cMfnUHtwPvYchThJip/mXiEKaBdLYIGig9koe81eBv6Qt2zYGRrbQigO1Cfy66pHHEa/5BZsD7HEYmj3AfnuhAZ57909AmbtUfx51Ky6xpc+wRfH+g86aE5BUpDHXX/Oy9KsLgJsrorsYXBOeLcmhUwcPNCjLqIuJujIAcLe64WrUL9VCtRRFAZn6AcJC1eHWVuMDYljcEQh4DCkgDM4FqwbD6/JNxtib+tXfofazJ5Afg5XHFDhMCdhAVJADXzTNLoa7Z2QmT/XNNAWmm176VZVaVqulJlfflwNuV+vQ+bbqW1JqfqbJIFyIQ5s24UUUBTfLQeQhw5/hv+QxGNFWmXJaMzHJyFf225zmEjYfkOeblK8HfK01XzYsBMi6N07Yq0CGmJWWIEqfUbAAs503PGFrNlTTQmo/SRsVYH71X8SIv30PhH433Yk5QA+d0HjTVAmkgB3vyzFmQ1KzftoPLy69SCpgkX55vug1TVtzYienHM1QsXp8DP6kktMQ/Kz3JEGLEnXDrfhzeGzciGfczcXovJAWi/1fS698E0Y8CepWR1WhBXK7D0qz/C6dmZPvHVjqt3/LA9KC9yY/rREF/Nkp72c/dmfTgZGgfMh5sqt35iwJqCD+mD27yczzXlA69NcDR03h7rfJh1eO7E7Mr5civUEdwB7z8Z5KX2A5zRSYbqTCg3q+ZD7GFTvgCggFeGHpHb2e/rzvHmuNel8h5QptdZbbqGN4ztneWKxPC91n/35pPRSa6zbYMBM94wvH44mwLOBg7P0hlOABOA8MCkyn8fznLc+Gn5r2nYPpyXxLsYZqn2jzO0NM8pNAt4TNJiZKOM+sc54RdMrVceht1aDsp2u24nc+PKlTluso5BMzBnchzo5EXkVA7jc5a0ftb0lJ5/FmMzxvmJzgsIiZXOeUrrgn0KeYtUYU/GUuvnhX48rSc98DR2mtaEoWxGaAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">1.00x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 900.00<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQhSURBVHgBrVfPbxNXEJ55u7aTtE1diUNoguTkVNRKyamllao6EmrT9gI9oJ4qVLWnNoW0f0CcP4CawBEJCCdAIMEFAUJKEAd+nHxB4UQsBRIOSIQEEhyv32NmvF42znrfLvBJjl/kt2+++ebHm0VICFPO519C175MRn1nDIxogAIC5OU3gBUEUwHEqq6byz2wMYcTKytJzkXbhrVyXzHjqkNksNgyaCXLhBAuQV1PdU88qcLbEGCPa84HkwbNYXg3lLrHl6YgDYGNcl8BXDVLywK8B5CRivH0/ig1thF4Ue4fUa6ZTSp3ClTB06PtJFT4H/Y8qXHM9UJKiKqibhQBjjlvSOq58+W/kPvtDmT2ltOQIRJ4KpIAJxxYYo4fDbwhMPQjYO8uUINjYGqr9NsuyO6/AM5nByyEsLh+bGeQ2C7/YVmSZHv2l4sklQG9dDsgox/fbnrS/7V8cMfnUHtwPvYchThJip/mXiEKaBdLYIGig9koe81eBv6Qt2zYGRrbQigO1Cfy66pHHEa/5BZsD7HEYmj3AfnuhAZ57909AmbtUfx51Ky6xpc+wRfH+g86aE5BUpDHXX/Oy9KsLgJsrorsYXBOeLcmhUwcPNCjLqIuJujIAcLe64WrUL9VCtRRFAZn6AcJC1eHWVuMDYljcEQh4DCkgDM4FqwbD6/JNxtib+tXfofazJ5Afg5XHFDhMCdhAVJADXzTNLoa7Z2QmT/XNNAWmm176VZVaVqulJlfflwNuV+vQ+bbqW1JqfqbJIFyIQ5s24UUUBTfLQeQhw5/hv+QxGNFWmXJaMzHJyFf225zmEjYfkOeblK8HfK01XzYsBMi6N07Yq0CGmJWWIEqfUbAAs503PGFrNlTTQmo/SRsVYH71X8SIv30PhH433Yk5QA+d0HjTVAmkgB3vyzFmQ1KzftoPLy69SCpgkX55vug1TVtzYienHM1QsXp8DP6kktMQ/Kz3JEGLEnXDrfhzeGzciGfczcXovJAWi/1fS698E0Y8CepWR1WhBXK7D0qz/C6dmZPvHVjqt3/LA9KC9yY/rREF/Nkp72c/dmfTgZGgfMh5sqt35iwJqCD+mD27yczzXlA69NcDR03h7rfJh1eO7E7Mr5civUEdwB7z8Z5KX2A5zRSYbqTCg3q+ZD7GFTvgCggFeGHpHb2e/rzvHmuNel8h5QptdZbbqGN4ztneWKxPC91n/35pPRSa6zbYMBM94wvH44mwLOBg7P0hlOABOA8MCkyn8fznLc+Gn5r2nYPpyXxLsYZqn2jzO0NM8pNAt4TNJiZKOM+sc54RdMrVceht1aDsp2u24nc+PKlTluso5BMzBnchzo5EXkVA7jc5a0ftb0lJ5/FmMzxvmJzgsIiZXOeUrrgn0KeYtUYU/GUuvnhX48rSc98DR2mtaEoWxGaAAAAAElFTkSuQmCC"
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                    <div class="RecentBetting-content">
                        <div><p class="RecentBetting-content-box-detail">普通百家乐</p></div>
                        <div><p class="RecentBetting-content-box-detail">***163</p></div>
                        <div><p class="RecentBetting-content-box-detail">2022-05-03 23:27:05</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 314.29<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANvSURBVHgBrVdBTBNBFP0zS4tAiSWRyI018eJJEi/GCJRbb1bUYAyJbUjwZMQjcqA9EI7W4EUTQomGYCSIJ+uJCh44aKwnLibWkySQUA1F3GV3nD/tllpa9q/4kk2m3Zl57/9583eGARGh6HbQMiACTOtlILqAMR0EBNVLBnkQIieAZRnwDPeZrzOptjxlXkYg1m2TxyXhlTIhAQIgZfqsxFqqLQf/IgAjtk1tXDZH4DgQLL4y15oALwKKUWvLsqnD/0HO8Fl9tbLBq/+4FN3uopIHmpl6CND9cs6LMrAjBWDkDab2CoiR3wj74XrYB0TUFMEryINe0t5xikO03w+x/kbZJmWhLAK5DgkoGU4HImKS3MHonSbwAL3EdSAgVEwL2e3hbh+Eew5S33VOg8sXGsADRpylUALUPvcATHs17g42Ug2p4De4CpiV1n6bOhDJoxXpr8TM4m9ILRpARJ77rDPcMrQIdYRjvHrAXeHBkEHk5oyJEHVE7AhyBC6BF0PiN0V6gJ+ndK42Xj2gIfEhKuiVAoRO6VvLePUwOnyCaEgWxF3g+oVTxaad7vCOdk6tkDqn9DpNN1YZgWbS1KoOuB4c0qsmDD0owMamcOsKX77ZcG9iV44hbce8FMBylJ6xa41y4gJMPdurKWSnIGDq+R6MPfyllgx/u0H2yHKw7c9uHbPrFnzftOFFMgCtLVxF+GbFLL/H9tBYAVpl2qcnmuHT+j5sbLkLkMix7ls/o4zBDKX39EQLnO3kMgO2rHqGTLcFgZaiP0aHm5RR8d3A/QJlOhAaRJxS/BUIuwErIUbokKZl5Oj4yn0/MLJDjR5kKW7j6vQqxCxlwMaWreq9AyxMleToASo5HlqRW+0VbttJIGLhrak8UY3VD/uwkDap04BpWeqgqgRk5uVhkYlH1MGTT/b+cjmu+2MZPRlCJNbmiwfUcrXgDXYcLxeU8bgUk08PCNGQ1NQjx8rcyXiZ12mo9bDtPqqI9x/34WXaUFsQCxWV3ECOChyqsaGb8k7A+bK6ermgeCwHWvQlcif1dQV4FUGCEFlJfrWavK4ABz2DP6Qv2DgcB0wk+I6dzCzVvqy6X04xGxoeWtltIEPI2gKzMupkrag9CSgLicjreQBCTPCIvIZ3qiu6PFCUCHOAX1UB7wTYWW0XlupFXI0/qyaAeYGIRS4AAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                        <div><p class="RecentBetting-content-box-detail">0.95x</p></div>
                        <div>
                            <p class="RecentBetting-content-box-detail">
                                $ 298.57<img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANvSURBVHgBrVdBTBNBFP0zS4tAiSWRyI018eJJEi/GCJRbb1bUYAyJbUjwZMQjcqA9EI7W4EUTQomGYCSIJ+uJCh44aKwnLibWkySQUA1F3GV3nD/tllpa9q/4kk2m3Zl57/9583eGARGh6HbQMiACTOtlILqAMR0EBNVLBnkQIieAZRnwDPeZrzOptjxlXkYg1m2TxyXhlTIhAQIgZfqsxFqqLQf/IgAjtk1tXDZH4DgQLL4y15oALwKKUWvLsqnD/0HO8Fl9tbLBq/+4FN3uopIHmpl6CND9cs6LMrAjBWDkDab2CoiR3wj74XrYB0TUFMEryINe0t5xikO03w+x/kbZJmWhLAK5DgkoGU4HImKS3MHonSbwAL3EdSAgVEwL2e3hbh+Eew5S33VOg8sXGsADRpylUALUPvcATHs17g42Ug2p4De4CpiV1n6bOhDJoxXpr8TM4m9ILRpARJ77rDPcMrQIdYRjvHrAXeHBkEHk5oyJEHVE7AhyBC6BF0PiN0V6gJ+ndK42Xj2gIfEhKuiVAoRO6VvLePUwOnyCaEgWxF3g+oVTxaad7vCOdk6tkDqn9DpNN1YZgWbS1KoOuB4c0qsmDD0owMamcOsKX77ZcG9iV44hbce8FMBylJ6xa41y4gJMPdurKWSnIGDq+R6MPfyllgx/u0H2yHKw7c9uHbPrFnzftOFFMgCtLVxF+GbFLL/H9tBYAVpl2qcnmuHT+j5sbLkLkMix7ls/o4zBDKX39EQLnO3kMgO2rHqGTLcFgZaiP0aHm5RR8d3A/QJlOhAaRJxS/BUIuwErIUbokKZl5Oj4yn0/MLJDjR5kKW7j6vQqxCxlwMaWreq9AyxMleToASo5HlqRW+0VbttJIGLhrak8UY3VD/uwkDap04BpWeqgqgRk5uVhkYlH1MGTT/b+cjmu+2MZPRlCJNbmiwfUcrXgDXYcLxeU8bgUk08PCNGQ1NQjx8rcyXiZ12mo9bDtPqqI9x/34WXaUFsQCxWV3ECOChyqsaGb8k7A+bK6ermgeCwHWvQlcif1dQV4FUGCEFlJfrWavK4ABz2DP6Qv2DgcB0wk+I6dzCzVvqy6X04xGxoeWtltIEPI2gKzMupkrag9CSgLicjreQBCTPCIvIZ3qiu6PFCUCHOAX1UB7wTYWW0XlupFXI0/qyaAeYGIRS4AAAAASUVORK5CYII="
                                    alt=""
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
@Component
export default class RecentBetting extends AbstractView {}
</script>

<style lang="scss" scoped>
@import "@/style/fontsize.scss";
.text-title {
    line-height: 33px;
}
.RecentBetting-container {
    width: 100%;
}
.RecentBetting-header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 8px;
    background: #192b4d;
    height: 56px;
    width: 100%;
    margin-bottom: 8px;
    div p {
        color: #6688cc;
        font-family: PingFang SC;
        font-weight: regular;
        font-size: 18px;
        line-height: 56px;
        letter-spacing: 0px;
        text-align: center;
        margin-bottom: 0;
    }
}
.RecentBetting-content-container {
    width: 100%;
    height: 624px;
    overflow: hidden;
    .RecentBetting-content-box {
        margin-top: -76px;
        .RecentBetting-content {
            display: flex;
            align-items: center;
            justify-content: space-around;
            border-radius: 8px;
            background: #192b4d;
            height: 68px;
            width: 100%;
            margin-bottom: 8px;
            border: 1px solid transparent;
            div {
                display: flex;
                align-items: center;
                justify-content: center;
                flex: 1 1;
                position: relative;
            }
            .RecentBetting-content-box-detail {
                color: #b3c4e5;
                font-size: 16px;
                line-height: 28px;
                letter-spacing: 0;
                text-align: center;
                margin-bottom: 0;
                img {
                    width: 16px;
                    vertical-align: middle;
                    margin-left: 10px;
                    margin-top: -5px;
                }
            }
        }
    }
}
.animatedDown {
    transition: all 0.5s ease-in-out;
    transform: translateY(76px);
    -webkit-transform: translateY(76px);
}
</style>
